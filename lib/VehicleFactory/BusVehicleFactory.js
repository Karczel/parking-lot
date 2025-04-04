import VehicleFactory from './VehicleFactory'

class BusVehicleFactory extends VehicleFactory{
    constructor() {
      super();
        if (BusVehicleFactory._instance) {
          return BusVehicleFactory._instance;
        }
        BusVehicleFactory._instance = this;
      }

      async create(description) {
            try {
              await fetch('/api/vehicles', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type: 'Bus', description: description? description:"Big car with 8 wheels." }),
              });
            } catch (error) {
              console.log(error);
            }
          };
}

const busVehicleFactory = new BusVehicleFactory();
export default busVehicleFactory;