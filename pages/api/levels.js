import dbConnect from '../../lib/api/MongooseDBConnector';
import Level from '../../schema/LevelSchema';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const level = await Level.find({});
        res.status(200).json({ success: true, data: level });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const level = await Level.create({});
        res.status(201).json({ success: true, data: level });
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