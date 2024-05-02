import express from 'express';
import dotenv from 'dotenv';
import * as  clientController from './Controllers/clientsController.js'
import * as  workoutController from './Controllers/workoutController.js'



dotenv.config();
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;


//creates an endpoint for the route /clients
app.get('/clients', clientController.getClients);

//creates an endpoint for the route /clients
app.get('/client/:id', clientController.getClientById);

// Adjust the getTrainerDetailsByClientId function to expect a parameter in the path
app.get('/trainer/:id', clientController.getTrainerDetailsByTrainerId);
// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming requests with JSON payloads

// Endpoint for /signup
app.post('/signup', clientController.signup);

app.get('/client/:clientId/workouts',workoutController.getClientWorkouts );

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


// Endpoint for /login
app.post('/login', clientController.login);