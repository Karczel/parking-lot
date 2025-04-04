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
        try {
          await fetch('/api/vehicles', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type: 'Motorcycle', description: description? description:"Car with 2 wheels." }),
          });
        } catch (error) {
          console.log(error);
        }
      };
}

const motorcycleVehicleFactory = new MotorcycleVehicleFactory();
export default motorcycleVehicleFactory;