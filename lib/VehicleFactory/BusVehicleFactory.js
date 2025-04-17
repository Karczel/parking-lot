import VehicleFactory from './VehicleFactory'
import apiManager from '../api/APIManager';

class BusVehicleFactory extends VehicleFactory{
    constructor() {
      super();
        if (BusVehicleFactory._instance) {
          return BusVehicleFactory._instance;
        }
        BusVehicleFactory._instance = this;
      }

      async create(description) {
        apiManager.createVehicle('Bus', description, "Big car with 8 wheels.")
          };
}

const busVehicleFactory = new BusVehicleFactory();
export default busVehicleFactory;