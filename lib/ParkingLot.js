class ParkingLot {
    constructor() {
    }
    
    park(vehicle) {
        const available_spot = this.find_space(vehicle.type)
        if (available_spot) {
            this.use_space(available_spot, vehicle);
        } else {
            print("No available space to park.")
        }
    }

    depart(vehicle){
        for (const level in levels){
            for (const parking_spot in level) {
                if (parking_spot.vehicle.id == vehicle.id){
                    parking_spot.vehicle = null;
                }
            }
        }
    }

    find_space(type) {
        // return parking_lot as [] for consequtive
        for (const level in levels){
            const available_spots = [];
            for (const parking_spot in level) {
            // found any: break loop
                if (parking_spot.vehicle == null){
                    if (type === "bus"){
                        // 5 consecutive parking spots
                        if (parking_spot.size == "large"){
                            available_spots.push(parking_spot);
                        }
                        if (available_spots.length() == 5) {
                            return available_spots;
                        }
                    }
                    // if type == car
                    else if (type === "car"){
                        if (parking_spot.size != "motorcycle"){
                            return [parking_spot];
                        }
                    }
                    // else if type == motorcycle
                    else if (type === "motorcycle"){
                        return [parking_spot];
                    }
                } 
            }
        }
        // no available spot found; error report
        print("Cannot park that Vehicle");
        return;
    }

    use_space(parking_lot, vehicle) {
        for (parking_spot in parking_lot){
            parking_spot.vehicle = vehicle;
        }
    }
}