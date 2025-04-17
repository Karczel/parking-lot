import apiManager from '../api/APIManager';
import VehicleFactory from './VehicleFactory'
class MotorcycleVehicleFactory extends VehicleFactory {
    constructor() {
      super();
        if (MotorcycleVehicleFactory._instance) {
          return MotorcycleVehicleFactory._instance;
        }
        MotorcycleVehicleFactory._instance = this;
      }

      async create(description) {
        apiManager.createVehicle('Motorcycle', description, "Car with 2 wheels.")
      };
}

const motorcycleVehicleFactory = new MotorcycleVehicleFactory();
export default motorcycleVehicleFactory;