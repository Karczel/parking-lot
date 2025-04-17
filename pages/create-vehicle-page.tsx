import { useState, useEffect, useMemo } from 'react';
import vehicleController from '@/lib/VehicleController'

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import apiManager from '@/lib/api/APIManager';

export default function CreateVehicle() {

  const vehicleTypes = useMemo(() => {
    const factories = vehicleController.getVehicleFactories();
    return Object.keys(factories ?? {});
    }, []);
  
  const [vehicle, setVehicle] = useState([]);
  const [form, setForm] = useState({ type: '', description: '' });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    const vehicles = await apiManager.fetchVehicles();
    setVehicle(vehicles ?? []);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChangeListbox = (value: string): void => 
    {
    setForm({ ...form, type: value });
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await vehicleController.getVehicleFactory(form.type).create(form.description);
    fetchVehicles();
    setForm({ type: '', description: '' });
    
  };

  return (
    <div>
      <h1>Vehicles</h1>
  
      <form onSubmit={handleSubmit} className='flex'>
      <Listbox
          name="type"
          aria-label="Vehicle type"
          value={form.type}
          onChange={handleChangeListbox}
        >
          <div className="relative">
            <ListboxButton 
            className={clsx(
              'relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-black',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}>
              {form.type || "Select Vehicle Type"}
              <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                aria-hidden="true"
              />
            </ListboxButton>
            <ListboxOptions anchor="bottom"
            transition
            className={clsx(
              'w-[var(--button-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
              'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
            )}
            >
              {vehicleTypes.map((vehicleType) => (
                <ListboxOption 
                key={vehicleType} 
                value={vehicleType} 
                className="data-[focus]:bg-blue-100">
                  {vehicleType}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>

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