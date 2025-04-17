import VehicleFactory from './VehicleFactory'
import apiManager from '../api/APIManager';

class CarVehicleFactory extends VehicleFactory{
    constructor() {
      super();
        if (CarVehicleFactory._instance) {
          return CarVehicleFactory._instance;
        }
        CarVehicleFactory._instance = this;
      }

      async create(description) {
        apiManager.createVehicle('Car', description, "Car with 4 wheels.")
      };
}

const carVehicleFactory = new CarVehicleFactory();
export default carVehicleFactory;