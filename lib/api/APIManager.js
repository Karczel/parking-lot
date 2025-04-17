class APIManager{
    constructor() {
        if (APIManager._instance) {
            return APIManager._instance;
        }
        APIManager._instance = this;
    }

    async fetchLevels(){
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

    async fetchLevel(levelId){
        try {
            const res = await fetch(`/api/levels/${levelId}`);
            const data = await res.json();
            return data.data;
          } catch (error) {
            console.error(`Failed to fetch level ${levelId}:`, error);
          }
    }

    async fetchLevelParkingSpots(levelId){
        try {
            const res = await fetch(`/api/levels/${levelId}/parkingspots`);
            const data = await res.json();
            return data.data;
          } catch (error) {
            console.error(`Failed to fetch parking spots for level ${levelId}:`, error);
          }
    }

    async fetchParkingSpot(parkingSpotId){
        try {
            const res = await fetch(`/api/parkingspots/${parkingSpotId}`);
            const data = await res.json();
            return data.data;
          } catch (error) {
            console.error(`Failed to fetch parking spot ${parkingSpotId}:`, error);
          }
    }

    async fetchVehicles(){
        try{
            const res = await fetch('/api/vehicles');
            const data = await res.json();
            return data.data; 
        } catch (error) {
            console.error(`Failed to fetch vehicles`, error);
      }
        
    }

    async fetchVehicle(vehicleId){
        try {
            const res = await fetch(`/api/vehicles/${vehicleId}`);
            const data = await res.json();
            return data.data;
          } catch (error) {
            console.error(`Failed to fetch vehicle ${vehicleId}:`, error);
          }
    }

    async createVehicle(type, description, defaultDescription){
        try {
            await fetch('/api/vehicles', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type: type, description: description? description:defaultDescription }),
            });
        } catch (error) {
            console.log(error);
        }
    }

    async createLevel(){
        try {
            const response = await fetch('/api/levels', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                alert('Level created!');
                window.location.reload();
            } else {
                alert('Failed to create level.');
            }
        } catch (error) {
            console.error('Error creating level:', error);
        }
    }

    async createParkingSpot(size, levelId){
        try {
            const spotResponse = await fetch('/api/parkingspots', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                size: size,
              }),
            });
        
            if (!spotResponse.ok) {
              alert('Failed to add parking spot.');
              return;
            }
        
            const spotData = await spotResponse.json();
            const newSpotId = spotData.data._id; // grab newly created spot's id
        
            const levelResponse = await fetch(`/api/levels/${levelId}`, {
              method: 'PATCH', 
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                parkingSpotId: newSpotId,
              }),
            });
        
            if (levelResponse.ok) {
              alert('Parking spot added and assigned to level!');
              setSpotSize('motorcycle');
              window.location.reload();
            } else {
              alert('Failed to assign parking spot to level.');
            }
          } catch (error) {
            console.error('Error adding parking spot:', error);
          }
    }

    async changeVehicleParkingSpot(parkingSpotId, setVehicles, setSelectedVehicleId){
        try {
            const updateRes = await fetch(`/api/parkingspots/${parkingSpotId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ vehicle: vehicle._id }),  // Only send the vehicle ID to update
            });

            const updateData = await updateRes.json();
            if (!updateData.success) {
                console.error("Failed to update parking spot:", parkingSpotId);
            }
            console.log(`Successfully parked ${vehicle.type}`)
        } catch (error) {
            console.error("Error updating parking spot:", parkingSpotId, error);
        }

        const vehicle = vehicles.find(v => v._id == parkingSpotId);
        if (vehicle) {
            parkinglot.park(vehicle);
            setVehicles(vehicles.filter(v => v._id !== parkingSpotId));
            setSelectedVehicleId('');
        } else {
            console.log('Vehicle not found.');
        }
    }
}

const apiManager = new APIManager();
export default apiManager;