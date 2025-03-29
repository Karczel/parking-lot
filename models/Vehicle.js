import mongoose from 'mongoose';

const VehicleSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true,
  },
  description: String,
  size: {
    type: Number,
    required: true
  }
  },
  { discriminatorKey: 'type', collection: 'vehicles'}
);

export default mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema);