import VehicleFactory from './VehicleFactory'

class CarVehicleFactory extends VehicleFactory{
    constructor() {
      super();
        if (CarVehicleFactory._instance) {
          return CarVehicleFactory._instance;
        }
        CarVehicleFactory._instance = this;
      }

      async create(description) {
        try {
          await fetch('/api/vehicles', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type: 'Car', description: description? description:"Car with 4 wheels." }),
          });
        } catch (error) {
          console.log(error);
        }
      };
}

const carVehicleFactory = new CarVehicleFactory();
export default carVehicleFactory;