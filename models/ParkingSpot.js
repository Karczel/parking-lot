import mongoose from 'mongoose';
import Vehicle from './Vehicle';

const ParkingSpotSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  available: Boolean,
  vehicle : Vehicle,
});

export default mongoose.models.ParkingSpot || mongoose.model('ParkingSpot', ParkingSpotSchema);