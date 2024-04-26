import { getClients } from '../Controllers/clientsController.js';
import { getClientById } from '../Controllers/clientsController.js';
import { getTrainerDetailsByTrainerId } from '../Controllers/clientsController.js';
import { getConnection } from '../databaseConn';

jest.mock('../databaseConn');



describe('clientsController', () => {
    describe('getClients', () => {
      const mockResults = [
        { client_id: 1, fname: 'John', lname: 'Doe', email: 'john.doe@example.com' },
        { client_id: 2, fname: 'Jane', lname: 'Smith', email: 'jane.smith@example.com' },
      ];
  
      afterEach(() => {
        jest.resetAllMocks();
      });
  
      it('should return an array of clients', async () => {
        const req = {}; // No request parameters required for this function
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
  
        getConnection.mockResolvedValueOnce({
          query: jest.fn().mockImplementation((query, callback) => {
            callback(null, mockResults, null);
          }),
        });
  
        await getClients(req, res);
  
        expect(res.json).toHaveBeenCalledWith(mockResults);
      });
  
      it('should return 500 if there is an error querying the database', async () => {
        const req = {};
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
          json: jest.fn(),
        };
  
        const mockError = new Error('Database connection error');
  
        getConnection.mockResolvedValueOnce({
          query: jest.fn().mockImplementation((_, callback) => {
            callback(mockError, null, null);
          }),
        });
  
        await getClients(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Error retrieving data from the database');
      });

      it('should return 404 if no clients are found', async () => {
        const req = { params: { clientId: '0' } };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
          json: jest.fn(),
        };
      
        getConnection.mockResolvedValueOnce({
          query: jest.fn().mockImplementation((_, callback) => {
            callback(null, [], null);
          }),
        });
      
        await getClients(req, res);
      
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('No clients found');
      });
    });
  });

  describe('clientController', () => {
    describe('getClientById', () => {
      const mockResults = [
        {
          client_id: 2,
          fname: 'Jane',
          lname: 'Doe',
          email: 'jane.doe@example.com',
          phone: 2147483647,
          dob: '1985-12-25T08:00:00.000Z',
          gender: 'female',
          height: 162,
          weight: 55,
          role: 'client',
          is_assigned_trainer: 0,
          password: 'password456',
          medical_history: 'Allergic to peanuts',
          emergency_contact: 1234567890,
          emergency_contact_name: 'John Doe',
          created_at: '2024-04-24T00:31:32.000Z',
          updated_at: '2024-04-24T00:31:32.000Z',
          trainer_id: 3,
        },
      ];
  
      afterEach(() => {
        jest.resetAllMocks();
      });
  
      it('should return the client data for a valid client', async () => {
        const req = { params: { id: '2' } };
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
  
        await getClientById(req, res);
        expect(res.json).toHaveBeenCalledWith(mockResults[0]);
      });

      it('should return 500 if there is an error querying the database', async () => {
        const req = {};
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
          json: jest.fn(),
        };
  
        const mockError = new Error('Database connection error');
  
        getConnection.mockResolvedValueOnce({
          query: jest.fn().mockImplementation((_, callback) => {
            callback(mockError, null, null);
          }),
        });
  
        await getClients(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Error retrieving data from the database');
      });
    });
  });

  describe('clientController', () => {
    describe('getTrainerDetailsByTrainerId', () => {
      const mockResults = [
        {
          client_id: 1,
          fname: 'John',
          lname: 'Doe',
          email: 'john.doe@example.com',
          phone: 1234567890,
          dob: '1990-05-15T07:00:00.000Z',
          gender: 'male',
          height: 176,
          weight: 70,
          role: 'client',
          is_assigned_trainer: 0,
          password: 'password123',
          medical_history: 'No known medical history',
          emergency_contact: 2147483647,
          emergency_contact_name: 'Jane Smith',
          created_at: '2024-04-24T00:31:32.000Z',
          updated_at: '2024-04-24T00:31:32.000Z',
        },
      ];
  
      afterEach(() => {
        jest.resetAllMocks();
      });
  
      it('should return the trainer details for a valid trainer ID', async () => {
        const req = { params: { id: '1' } };
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
  
        await getTrainerDetailsByTrainerId(req, res);
        expect(res.json).toHaveBeenCalledWith(mockResults[0]);
      });
  
      it('should return 500 if there is an error querying the database', async () => {
        const req = {};
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
          json: jest.fn(),
        };
  
        const mockError = new Error('Database connection error');
  
        getConnection.mockResolvedValueOnce({
          query: jest.fn().mockImplementation((_, callback) => {
            callback(mockError, null, null);
          }),
        });
  
        await getClients(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Error retrieving data from the database');
      });
    });
  });