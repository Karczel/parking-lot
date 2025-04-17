import mongoose from 'mongoose';

const VehicleSchema = new mongoose.Schema(
  {
  type: {
    type: String,
    required: true,
  },
  description: String,
  licenseNumber: String,
  parkedSpot: [
    {type: mongoose.Schema.Types.ObjectId, 
      ref: 'ParkingSpot' }
  ]
  }
);

export default mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema);