import { Place } from '../../src/location'

const default_lat = 39.9526
const default_lon = -75.1652

describe('location', () => {
  it('should construct a new location', () => {
    location = new Place(default_lat, default_lon)
    expect(location.latitude).toEqual(default_lat)
    expect(location.longitude).toEqual(default_lon)
  })

  it('should calculate distance between 2 locations', () => {
    locationA = new Place(default_lat, default_lon)
    locationB = new Place(40.7128, -74.0060)
    expect(Place.distanceBetween(locationA, locationB)).toEqual(80.56)
  })

  it('should calculate distance as zero for same location', () => {
    location = new Place(default_lat, default_lon)
    expect(Place.distanceBetween(location, location)).toEqual(0)
  })
})
