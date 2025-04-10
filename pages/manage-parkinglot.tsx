import { ParkingLot } from "@/lib/ParkingLot"
import { useState } from "react";
import { useEffect } from "react";

export default function ParkingManager() {
    const parkinglot = new ParkingLot();
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicleId, setSelectedVehicleId] = useState('');

    useEffect(() => {
        fetchVehicles();
    }, []);
    
    const fetchVehicles = async () => {
        const res = await fetch('/api/vehicles');
        const data = await res.json();
        setVehicles(data.data);
    };

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
        </div>
    )
}