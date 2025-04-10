import dbConnect from '../../../lib/MongooseDBConnector';
import Level from '../../../models/Level';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'PUT':
      try {
        const level = await Level.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!level) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: level });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        const deletedLevel = await Level.deleteOne({ _id: id });
        if (!deletedLevel) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

      case 'PATCH':
      try {
        const { parking_spot_id } = req.body;
        const level = await Level.findByIdAndUpdate(
          id,
          { $push: { parking_spots: parking_spot_id } },
          { new: true }
        );

        if (!level) {
          return res.status(404).json({ success: false, message: 'Level not found' });
        }

        res.status(200).json({ success: true, data: level });
      } catch (error) {
        console.error('Error updating level:', error);
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}