export default class VehicleFactory {
    //abstract in js
   constructor() {
    if (new.target === VehicleFactory) {
        throw new Error("Cannot instantiate abstract class VehicleFactory directly");
      }
  
    if(this.create == undefined) {
        throw new Error("create method must be implemented");
    };

 }
}