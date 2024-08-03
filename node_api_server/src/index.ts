import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.NODE_PORT || 3000;
console.log('mongo', process.env.MONGO_URL )

app.get('/', (req, res) => {
  res.send('Node.js API Server is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
