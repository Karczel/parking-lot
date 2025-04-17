import ParkingSpot from './ParkingSpot';

class Level {
  constructor(parkingSpots = [], id) {
    this.parkingSpots = parkingSpots;
    this._id = id;
  }

  getId(){
    return this._id;
  }

  getSpots(){
    return this.parkingSpots;
  }

  addSpots(spots) {
    for (spot in spots){
        this.parkingSpots.push(spot);
    }
  }
}

export default Level;