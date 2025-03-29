import Vehicle from './Vehicle';

const CarSchema = Vehicle.discriminator('Car');
export default mongoose.models.Car || mongoose.model('Car', CarSchema);