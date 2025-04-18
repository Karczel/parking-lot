import dbConnect from '../../../lib/api/MongooseDBConnector';
import Vehicle from '../../../schema/VehicleSchema';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'PUT':
      try {
        const vehicle = await Vehicle.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!vehicle) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: vehicle });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        const deletedVehicle = await Vehicle.deleteOne({ _id: id });
        if (!deletedVehicle) {
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