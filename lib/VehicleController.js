import MotorcycleVehicleFactory from '@/lib/VehicleFactory/MotorcycleVehicleFactory'
import CarVehicleFactory from '@/lib/VehicleFactory/CarVehicleFactory'
import BusVehicleFactory from '@/lib/VehicleFactory/BusVehicleFactory'

class VehicleController{
    constructor() {
        if (VehicleController._instance) {
            return VehicleController._instance;
        }
        VehicleController._instance = this;
        this.vehicleFactory = {
            "Motorcycle" : MotorcycleVehicleFactory,
            "Car" : CarVehicleFactory,
            "Bus" : BusVehicleFactory,
        }
    }

    getVehicleFactories(){
        return this.vehicleFactory;
    }

    getVehicleFactory(type){
        return this.vehicleFactory[type];
    }
}

const vehicleController = new VehicleController();
export default vehicleController;