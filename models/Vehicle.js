import mongoose from 'mongoose';

const VehicleSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  description: String,
  },
  { discriminatorKey: 'type', collection: 'vehicles'}
);

export default mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema);