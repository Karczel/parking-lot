'use client';

import { useEffect, useState } from 'react';

export default function ParkingSpaceManager() {
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [spotSize, setSpotSize] = useState('compact');

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await fetch('/api/levels');
        const data = await response.json();
        setLevels(data.data);
      } catch (error) {
        console.error('Failed to fetch levels:', error);
      }
    };

    fetchLevels();
  }, []);

  const addLevel = async () => {

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
  };

  const addParkingSpot = async () => {
    if (!selectedLevel || !spotSize) {
      alert('Please select a level and spot size.');
      return;
    }
  
    try {
      const spotResponse = await fetch('/api/parkingspots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          size: spotSize,
        }),
      });
  
      if (!spotResponse.ok) {
        alert('Failed to add parking spot.');
        return;
      }
  
      const spotData = await spotResponse.json();
      const newSpotId = spotData.data._id; // grab newly created spot's id
  
      const levelResponse = await fetch(`/api/levels/${selectedLevel}`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parking_spot_id: newSpotId,
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
  };
  

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Parking Space Manager</h1>

      {/* Add Level Form */}
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-lg font-semibold mb-2">Add New Level</h2>
        <button
          onClick={addLevel}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Level
        </button>
      </div>

      {/* Add Parking Spot Form */}
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-lg font-semibold mb-2">Add Parking Spot</h2>

        <div className="mb-2">
          <label className="block mb-1">Select Level:</label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select a level</option>
            {levels.map((level) => (
              <option key={level._id} value={level._id}>
                {level._id}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label className="block mb-1">Select Spot Size:</label>
          <select
            value={spotSize}
            onChange={(e) => setSpotSize(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="motorcycle">Motorcycle</option>
            <option value="compact">Compact</option>
            <option value="large">Large</option>
          </select>
        </div>

        <button
          onClick={addParkingSpot}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Parking Spot
        </button>
      </div>
    </div>
  );
}
