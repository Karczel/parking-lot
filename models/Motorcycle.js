import Vehicle from './Vehicle';

const MotorcycleSchema = Vehicle.discriminator('Motorcycle');
export default mongoose.models.Motorcycle || mongoose.model('Motorcycle', MotorcycleSchema);