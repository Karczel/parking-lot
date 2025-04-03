import { useState, useEffect } from 'react';

export default function Home() {
  const [vehicle, setVehicle] = useState([]);
  const [form, setForm] = useState({ type: '', description: '' });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    const res = await fetch('/api/vehicles');
    const data = await res.json();
    setVehicle(data.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await fetch('/api/vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      fetchVehicles();
      setForm({ type: '', description: '' });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Vehicles</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="type"
          placeholder="Vehicle type"
          value={form.type}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Vehicle description"
          value={form.description}
          onChange={handleChange}
        />
        <button type="submit">Add Vehicle</button>
      </form>

      <ul>
        {vehicle.map((vehicle) => (
          <li key={vehicle._id}>
            {vehicle.type} - {vehicle.description}
          </li>
        ))}
      </ul>
    </div>
  );
}