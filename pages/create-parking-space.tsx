'use client';

import apiManager from '@/lib/api/APIManager';
import { useEffect, useState } from 'react';

export default function ParkingSpaceManager() {
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [spotSize, setSpotSize] = useState('compact');

  useEffect(() => {
    fetchLevels();
  }, []);

  const fetchLevels = async () => {
    const levels = await apiManager.fetchLevels();
    setLevels(levels);
  };

  const addLevel = async () => {
    await apiManager.createLevel();
  };

  const addParkingSpot = async () => {
    if (!selectedLevel || !spotSize) {
      alert('Please select a level and spot size.');
      return;
    }
    await apiManager.createParkingSpot(spotSize, selectedLevel);
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
