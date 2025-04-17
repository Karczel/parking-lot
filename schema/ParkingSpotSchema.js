import mongoose from 'mongoose';

const ParkingSpotSchema = new mongoose.Schema({
  size: {
    type: String,
    enum: ['motorcycle', 'compact', 'large'],
    required: true
  },
  vehicle : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    default: null,
  },
});

export default mongoose.models.ParkingSpot || mongoose.model('ParkingSpot', ParkingSpotSchema);