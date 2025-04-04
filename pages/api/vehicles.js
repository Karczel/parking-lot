import dbConnect from '../../lib/MongooseDBConnector';
import Vehicle from '../../models/Vehicle';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const vehicle = await Vehicle.find({});
        res.status(200).json({ success: true, data: vehicle });
      } catch (error) {
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