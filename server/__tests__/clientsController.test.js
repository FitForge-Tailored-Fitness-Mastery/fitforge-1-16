import { getClients } from '../Controllers/clientsController';
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
    });
  });