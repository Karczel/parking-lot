import Vehicle from './Vehicle';

const BusSchema = Vehicle.discriminator('Bus');
export default mongoose.models.Bus || mongoose.model('Bus', BusSchema);