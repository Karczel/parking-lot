import dbConnect from '../../lib/api/MongooseDBConnector';
import ParkingSpot from '../../schema/ParkingSpotSchema';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const parkingspot = await ParkingSpot.find({});
        res.status(200).json({ success: true, data: parkingspot });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const parkingspot = await ParkingSpot.create(req.body);
        res.status(201).json({ success: true, data: parkingspot });
      } catch (error) {
        console.error('Error creating level:', error);

        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}