import express from 'express';
import dotenv from 'dotenv';
import MongooseConnection from './config/db';
import { conversationRoutes } from './routes/conversation-routes';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.NODE_PORT || 3000;

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
