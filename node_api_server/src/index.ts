import express from 'express';
import dotenv from 'dotenv';
import MongooseConnection from './config/db';
import { conversationRoutes } from './routes/conversation-routes';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.NODE_PORT || 4000;

app.get('/', (_, res) => {
  res.send('Node.js API Server is running!');
});

// registering routes
app.use('/api/conversations', conversationRoutes);

(async () => {
  await MongooseConnection.getInstance().connect();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();
