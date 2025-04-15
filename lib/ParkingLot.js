export class ParkingLot {
    constructor() {
        this.levels = [];
        this.fetch_levels().then(fetchedLevels => {
            this.levels = fetchedLevels;
            console.log("Levels assigned:", this.levels); // Verify this.levels assignment
        });    }

    async fetch_levels(){
        try {
            const protocol = `http://`
            const host = `localhost:3000`;
            const levelRes = await fetch(`${protocol}${host}/api/levels`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        const levelData = await levelRes.json();

        // Now populate each level's parking spots
        const levels = await Promise.all(levelData.data.map(async (level) => {
            const populatedSpots = await Promise.all(level.parking_spots.map(async (spotId) => {
            const spotRes = await fetch(`${protocol}${host}/api/parkingspots/${spotId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const spotData = await spotRes.json();
            return spotData.data;
            }));

            return {
            ...level,
            parking_spots: populatedSpots,
            };
        }));
        console.log(levels)

        return levels
        } catch (error) {
            console.log(error);
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
            try {
                const updateRes = await fetch(`/api/parkingspots/${parking_spot_id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ vehicle: vehicle._id }),  // Only send the vehicle ID to update
                });
    
                const updateData = await updateRes.json();
                if (!updateData.success) {
                    console.error("Failed to update parking spot:", parking_spot_id);
                }
                console.log(`Successfully parked ${vehicle.type}`)
            } catch (error) {
                console.error("Error updating parking spot:", parking_spot_id, error);
            }
        }
    }
    
}