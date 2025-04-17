import { ParkingLot } from "@/lib/ParkingLot"
import { useState } from "react";
import { useEffect } from "react";
import apiManager from '@/lib/api/APIManager';


export default function ParkingManager() {
    const [parkinglot, setParkinglot] = useState(new ParkingLot());
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicleId, setSelectedVehicleId] = useState('');

    useEffect(() => {
        loadParkingLot();
        fetchVehicles();
    }, []);

    const loadParkingLot = async () => {
        await parkinglot.init();
        console.log(parkinglot.levels);
        setParkinglot(parkinglot);
      };
    
    const fetchVehicles = async () => {
        const fetchedVehicle = await apiManager.fetchVehicles();
        setVehicles(fetchedVehicle ?? []);
  };
  console.log(parkinglot);

    const handlePark = () => {
        const vehicle = vehicles.find(v => v._id == selectedVehicleId);
        if (vehicle) {
            parkinglot.park(vehicle);
            setVehicles(vehicles.filter(v => v._id !== selectedVehicleId));
            setSelectedVehicleId('');
        } else {
            console.log('Vehicle not found.');
        }
    };

    return (
        <div>
            <h1>Parking Manager</h1>
            <select
                value={selectedVehicleId}
                onChange={(e) => setSelectedVehicleId(e.target.value)}
            >
                <option value="">Select a vehicle</option>
                {vehicles.map((vehicle) => (
                <option key={vehicle._id} value={vehicle._id}>
                    {vehicle.type}
                </option>
                ))}
            </select>

            <button onClick={handlePark} disabled={!selectedVehicleId}>
                Park Vehicle
            </button>

                
            <ul>
                {parkinglot.levels.map((level) => (
                    <li key={level._id}>
                        <h3>Level: {level._id}</h3>
                        <ul>
                            {level.parking_spots.map((spot) => (
                                <li key={spot._id}>
                                    {/* {spot._id} - {spot.vehicle ? `${spot.vehicle.type} - ${spot.vehicle.description}` : 'Empty'} */}
                                    {spot._id} - {spot.vehicle ? `${spot.vehicle}` : 'Empty'}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
}