import express from 'express';
import dotenv from 'dotenv';
import * as  clientController from './Controllers/clientsController.js'

dotenv.config();
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;


//creates an endpoint for the route /clients
app.get('/clients', clientController.getClients);
// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming requests with JSON payloads

// Endpoint for /signup
app.post('/signup', clientController.signup);


// Existing /api route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from ExpressJS' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
