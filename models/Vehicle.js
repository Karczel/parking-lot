import mongoose from 'mongoose';

const VehicleSchema = new mongoose.Schema(
  {
  type: {
    type: String,
    required: true,
  },
  description: String,
  }
);

export default mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema);