class Location {
  constructor (latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  static distanceBetween (locationA, locationB) {
    return [
      locationA.latitude - locationB.latitude,
      locationA.longitude - locationB.longitude
    ];
  }
}

class Pin extends Location {
  constructor (name, address, latitude, longitude, imgUrl) {
    super(latitude, longitude);
    this.name = name;
    this.address = address;
    this.imgUrl = imgUrl;
  }

  save () {
    api.post(this);
  }

  delete () {
    api.delete(this);
  }

  distanceFromCurrentLocation () {
    currentLocation = store.currentLocation;
    return this.distanceBetween(currentLocation, this);
  }
}
