import { Constants, Location, Permissions } from 'expo'

import store from '../store'

class Place {
  constructor (latitude, longitude) {
    this.latitude = latitude
    this.longitude = longitude
  }

  static distanceBetween (locationA, locationB) {
    var dist = haversineDistance(
      locationA.latitude,
      locationA.longitude,
      locationB.latitude,
      locationB.longitude
    )
    return round(dist, 2)
  }
}

class Pin extends Place {
  constructor (name, address, latitude, longitude, imgUrl) {
    super(latitude, longitude)
    this.name = name
    this.address = address
    this.imgUrl = imgUrl
  }

  save () {
    api.post(this)
  }

  delete () {
    api.delete(this)
  }

  distanceFromCurrentLocation () {
    currentLocation = store.currentLocation
    return this.distanceBetween(currentLocation, this)
  }
}

var haversineDistance = (lat1, lon1, lat2, lon2) => {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0
  }
  const R = 3960  // Radius of Earth in miles
  var lat1 = toRad(lat1)
  var lat2 = toRad(lat2)
  var dLon = lon1 - lon2
  var dLon = toRad(dLon)
  var dist =
    Math.sin(lat1) *
    Math.sin(lat2) + Math.cos(lat1) *
    Math.cos(lat2) *
    Math.cos(dLon)
  dist = Math.acos(dist)
  return dist * R
}

var toRad = (num) => num * Math.PI / 180

var round = (value, precision) => {
    var multiplier = Math.pow(10, precision || 0)
    return Math.round(value * multiplier) / multiplier
}

var updateLocation = () => {
  Permissions.askAsync(Permissions.LOCATION).then(status => {
    if (status.status !== 'granted') {
      errorMessage = 'Permission to access location was denied'
      alert(errorMessage)
    }
    else {
      Location.getCurrentPositionAsync({}).then(location => {
        store.commit(
          'setCurrentLocation',
          new Place(
            location.coords.latitude,
            location.coords.longitude
          )
        )
      })
    }
  }).catch(err => {
    console.log(err)
  })
}

getLocationAsync = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
      errorMessage = 'Permission to access location was denied'
      alert(errorMessage)
  }
  let location = await Location.getCurrentPositionAsync({})
  location = new Place(
    location.coords.latitude,
    location.coords.longitude
  )
  return location
}

export { Place , updateLocation, getLocationAsync }
