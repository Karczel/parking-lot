import ParkingSpot from './ParkingSpot';

class Vehicle {
  constructor(
    id, 
    type,
    description,
    licenseNumber, 
    requiredSpace
  ) {
    this._id = id;
    this._type = type;
    this.description = description
    this._licenseNumber = licenseNumber? licenseNumber:this.generateLicenseNumber()
    this._requiredSpace = requiredSpace
    this._parkedSpot = []
  }

  generateLicenseNumber(){
   // generates random license like 'ABC-1234'
   const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   const nums = Math.floor(1000 + Math.random() * 9000);
   const chars = Array.from({ length: 3 }, () =>
     letters.charAt(Math.floor(Math.random() * letters.length))
   ).join('');
   return `${chars}-${nums}`;
 }

  getLicenseNumber() {
    return this._licenseNumber;
  }

  getRequiredSpace() {
    return this._requiredSpace;
  }
  getType() {
    return this._type;
  }
  park(parkSpot) {
    this._parkedSpot = [];
    for (spot in parkSpot){
        this._parkedSpot.push(spot);
    }
  }
  depart() {
    this._parkedSpot = [];
  }
}

export default Vehicle;
