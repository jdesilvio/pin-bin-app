import { Location } from '../../../src/structures/location'

const default_lat = 39.9526
const default_lon = -75.1652

describe('location', () => {
  it('should construct a new location', () => {
    location = new Location(default_lat, default_lon)
    expect(location.latitude).toEqual(default_lat)
    expect(location.longitude).toEqual(default_lon)
  })

  it('should calculate distance between 2 locations', () => {
    locationA = new Location(default_lat, default_lon)
    locationB = new Location(40.7128, -74.0060)
    console.log(Location.distanceBetween(locationA, locationB))
    expect(Location.distanceBetween(locationA, locationB)).toEqual(100)
  })
})
