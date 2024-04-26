import express from 'express';
import { getClientWorkouts } from '../Controllers/workoutController.js'; // Correct the path casing
import { getClients} from '../Controllers/clientsController.js'

const router = express.Router();
router.get('/', getClients);

router.get('/:clientId/workouts', getClientWorkouts);

export default router; // Export the router as the default export