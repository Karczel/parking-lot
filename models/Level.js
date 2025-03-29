import mongoose from 'mongoose';
import ParkingSpot from './ParkingSpot';

const LevelSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  parking_spots: Array<ParkingSpot>[]
});

export default mongoose.models.Level || mongoose.model('Level', LevelSchema);