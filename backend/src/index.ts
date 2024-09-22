import express from 'express';
import { connectDB } from './config/db';
import cors from 'cors';
import coockieparser from 'cookie-parser';

import routes from './routes/route';

const app = express();

app.use(express.json());
app.use(coockieparser());

app.use(cors({
  credentials: true,
  // origin: 'https://tasker-next-app.vercel.app',
  origin:"https://task-buddy-one.vercel.app",
}));

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/api/v1', routes);

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
