import mongoose from 'mongoose';

const LevelSchema = new mongoose.Schema({
  parking_spots: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'ParkingSpot' }
  ]
});

export default mongoose.models.Level || mongoose.model('Level', LevelSchema);