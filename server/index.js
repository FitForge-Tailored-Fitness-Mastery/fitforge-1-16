import express from 'express';
import dotenv from 'dotenv';
import * as  clientController from './Controllers/clientsController.js'

dotenv.config();
import cors from 'cors';
import bcrypt from 'bcrypt';

const app = express();
const PORT = process.env.PORT || 5000;


//creates an endpoint for the route /clients
app.get('/clients', clientController.getClients);
// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming requests with JSON payloads

// Dummy database connection
// You need to replace this with your actual database connection logic
const users = [];

app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Here you should add input validation

  try {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Replace the below logic with actual database insertion logic
    const newUser = { firstName, lastName, email, password: hashedPassword };
    users.push(newUser); // In a real app, you'd insert this into the database
    console.log(users);
    // Send back a successful response
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Existing /api route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from ExpressJS' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
