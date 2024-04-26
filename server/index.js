import express from 'express';
import dotenv from 'dotenv';
import * as  clientController from './Controllers/clientsController.js'
import clientRouter from './routes/clientRoutes.js'; // Rename the import to clientRouter


dotenv.config();

const app = express();

//Set the port that you want the server to run on
const PORT = process.env.PORT || 5000;

app.use(express.json());

//creates an endpoint for the route /clients
app.use('/clients', clientRouter);
app.use('/client', clientRouter);

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});