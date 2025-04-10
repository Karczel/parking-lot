import dbConnect from '../../../lib/MongooseDBConnector';
import ParkingSpot from '../../../models/ParkingSpot';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const parkingSpot = await ParkingSpot.findById(id);
        if (!parkingSpot) {
          return res.status(404).json({ success: false, message: 'Parking spot not found' });
        }
        res.status(200).json({ success: true, data: parkingSpot });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      try {
        const parkingSpot = await ParkingSpot.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!parkingSpot) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: parkingSpot });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PATCH':
      try {
        const updatedParkingSpot = await ParkingSpot.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
      });
      if (!updatedParkingSpot) {
        return res.status(404).json({ success: false, message: 'Parking spot not found' });
      }

        res.status(200).json({ success: true, data: updatedParkingSpot });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedParkingSpot = await ParkingSpot.deleteOne({ _id: id });
        if (!deletedParkingSpot) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}