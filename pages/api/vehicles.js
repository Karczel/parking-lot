import dbConnect from '../../lib/api/MongooseDBConnector';
import Vehicle from '../../schema/VehicleSchema';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const vehicle = await Vehicle.find({});
        res.status(200).json({ success: true, data: vehicle });
      } catch (error) {
        console.error("GET /api/vehicles error:", error);

        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const vehicle = await Vehicle.create(req.body);
        res.status(201).json({ success: true, data: vehicle });
      } catch (error) {
        console.error('Error creating vehicle:', error);

        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}