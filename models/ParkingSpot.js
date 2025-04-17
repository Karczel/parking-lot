// lib/models/ParkingSpot.ts

class ParkingSpot {
    constructor(size, id) {
      this._size = size;
      this.vehicle = null;
      this._id = id;
    }
  
    getId(){
        return this._id;
    }
    getSize(){
        return this._size;
    }

    getVehicle() {
        return this.vehicle;
    }

    setVehicle(vehicle) {
        this.vehicle = vehicle;
    }
  }
  
  export default ParkingSpot;
  