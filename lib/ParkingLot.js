import apiManager from "./api/APIManager";

export class ParkingLot {
    constructor() {
        this.levels = [];
        this.init();
        }

    async init() {
            try {
                this.levels = await apiManager.fetchFilledLevels();
                console.log("Levels assigned:", this.levels);
            } catch (error) {
                console.error("Failed to initialize parking lot levels:", error);
            }
        }
    
    async park(vehicle) {
        if (this.levels.length === 0) {
            console.log("No levels available.");
            return;
        }
        
        const available_spot = await this.find_space(vehicle.type);
        console.log(available_spot);
    
        if (available_spot && available_spot.length > 0) {
            await this.use_space(available_spot, vehicle);
        } else {
            console.log("No available space to park.");
        }
    }
    
    

    async depart(vehicle){
        for (const level of this.levels){
            for (const parking_spot in level) {
                if (parking_spot.vehicle.id == vehicle.id){
                    parking_spot.vehicle = null;
                    await parking_spot.save();
                }
            }
        }
    }

    async find_space(type) {
        // return parking_lot as [] for usespace()
        if (!Array.isArray(this.levels) || this.levels.length === 0) {
            console.log("No levels available");
            return null;  // Early return if levels is not an array or is empty
        }
        for (const level of this.levels){
            console.log(level)
            const available_spots = [];
            for (const parking_spot of level.parking_spots) {
            // found any: break loop
                console.log(parking_spot)
                if (parking_spot.vehicle == null){
                    if (type === "Bus"){
                        // 5 consecutive parking spots
                        if (available_spots.length >= 5) {
                            return available_spots;
                        }
                        if (parking_spot.size == "large"){
                            available_spots.push(parking_spot._id);
                        } else {
                            available_spots.length = 0;
                        }
                    }
                    // if type == car
                    else if (type === "Car"){
                        if (parking_spot.size != "motorcycle"){
                            return [parking_spot._id];
                        }
                    }
                    // else if type == motorcycle
                    else if (type === "Motorcycle"){
                        return [parking_spot._id];
                    } else {
                        // No vehicle of that type
                        console.log("Cannot park that Vehicle");
                    }
                } 
            }
        }
        return null;
    }

    async use_space(parking_lot, vehicle) {
        if (!vehicle) {
            console.error("No vehicle provided.");
            return;
        }
        console.log(parking_lot)
        for (const parking_spot_id of parking_lot) {  // Iterate over parking spot ids
            apiManager.changeVehicleParkingSpot(parking_spot_id);
        }
    }
    
}