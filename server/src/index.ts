import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database';
import nootropicRoutes from './routes/nootropicRoutes';
import stackRoutes from './routes/stackRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', nootropicRoutes);
app.use('/api', stackRoutes);

// Basic route
app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Nootropic Nexus API is running');
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 