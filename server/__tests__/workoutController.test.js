import { getClientWorkouts } from '../Controllers/workoutController';
import { getConnection } from '../databaseConn';

jest.mock('../databaseConn');

describe('workoutController', () => {
    describe('getClientWorkouts', () => {
      const mockResults = [
        {
          fname: 'John',
          lname: 'Doe',
          date: '2024-05-02T16:00:00.000Z',
          duration: 75,
          calories_burned: 250,
          sets: '3 sets of 15 reps',
          description: 'Pilates mat workout',
          exercise_name: 'Roll-Up',
        },
      ];
  
      afterEach(() => {
        jest.resetAllMocks();
      });
  
      it('should return an array of workouts for a valid client', async () => {
        const req = {
          params: {
            clientId: '1',
          },
        };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
  
        getConnection.mockResolvedValueOnce({
          query: jest.fn().mockImplementation((_, __, callback) => {
            callback(null, mockResults, null);
          }),
        });
  
        await getClientWorkouts(req, res);
  
        expect(res.json).toHaveBeenCalledWith(mockResults);
      });
  
      it('should return 404 if no workouts are found for the client', async () => {
        const req = {
          params: {
            clientId: '2',
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
          json: jest.fn(),
        };
  
        getConnection.mockResolvedValueOnce({
          query: jest.fn().mockImplementation((_, __, callback) => {
            callback(null, [], null);
          }),
        });
  
        await getClientWorkouts(req, res);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('Client not found');
      });
  
      it('should return 500 if there is an error querying the database', async () => {
        const req = {
          params: {
            clientId: '1',
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
          json: jest.fn(),
        };
  
        const mockError = new Error('Database connection error');
  
        getConnection.mockResolvedValueOnce({
          query: jest.fn().mockImplementation((_, __, callback) => {
            callback(mockError, null, null);
          }),
        });
  
        await getClientWorkouts(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Error retrieving data from the database');
        //expect(console.error).toHaveBeenCalledWith('Error querying the database: ', mockError);
      });
    });
  });