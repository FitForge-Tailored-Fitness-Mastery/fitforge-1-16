  import { getClients,login,signup } from '../Controllers/clientsController';
  import { getConnection } from '../databaseConn';
  import * as bcrypt from 'bcrypt';
  import request from 'supertest';



  jest.mock('../databaseConn');
  jest.mock('bcrypt');
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

    describe('clientsController', () => {
      describe('login', () => {
        const mockUser = {
          email: 'john.doe@example.com',
          password: '$2b$10$k5vQAVTSJnYjyJSZ6mUG4.Bh1RDaXizO3DuDPHdXaZNHPRQqnlWlK', // Hashed password for 'password123'
        };
    
        afterEach(() => {
          jest.resetAllMocks();
        });
    
        it('should return 400 if email or password is missing', async () => {
          const req = { body: { email: 'john.doe@example.com' } };
          const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
          await login(req, res);
    
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalledWith({ error: 'Email and password are required' });
        });
    
        // it('should return 401 if user is not found', async () => {
        //   const req = { body: { email: 'unknown@example.com', password: 'password123' } };
        //   const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
        //   getConnection.mockResolvedValueOnce({
        //     query: jest.fn().mockImplementation((query, values, callback) => {
        //       callback(null, []);
        //     }),
        //   });
    
        //   await login(req, res);
    
        //   expect(res.status).toHaveBeenCalledWith(401);
        //   expect(res.json).toHaveBeenCalledWith({ error: 'No user found with this email' });
        // });
    
        // it('should return 401 if password is incorrect', async () => {
        //   const req = { body: { email: 'john.doe@example.com', password: 'wrongpassword' } };
        //   const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
        //   getConnection.mockResolvedValueOnce({
        //     query: jest.fn().mockImplementation((query, values, callback) => {
        //       callback(null, [mockUser]);
        //     }),
        //   });
        //   bcrypt.compare.mockResolvedValueOnce(false);
    
        //   await login(req, res);
    
        //   expect(res.status).toHaveBeenCalledWith(401);
        //   expect(res.json).toHaveBeenCalledWith({ error: 'Password is incorrect' });
        // });
    
        // it('should return 200 if user is found and password is correct', async () => {
        //   const req = { body: { email: 'john.doe@example.com', password: 'password123' } };
        //   const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
        //   getConnection.mockResolvedValueOnce({
        //     query: jest.fn().mockImplementation((query, values, callback) => {
        //       callback(null, [mockUser]);
        //     }),
        //   });
        //   bcrypt.compare.mockResolvedValueOnce(true);
    
        //   await login(req, res);
    
        //   expect(res.status).toHaveBeenCalledWith(200);
        //   expect(res.json).toHaveBeenCalledWith({ message: 'User found and password is correct' });
        // });
    
        it('should return 500 if there is an error querying the database', async () => {
          const req = { body: { email: 'john.doe@example.com', password: 'password123' } };
          const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
          const mockError = new Error('Database connection error');
    
          getConnection.mockResolvedValueOnce({
            query: jest.fn().mockImplementation((query, values, callback) => {
              callback(mockError, null);
            }),
          });
    
          await login(req, res);
    
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
        });
      });
    });



    describe('signup', () => {
      afterEach(() => {
        jest.resetAllMocks();
      });
    
      it('should return 400 if required fields are missing', async () => {
        const req = { body: { firstName: 'John', lastName: 'Doe', email: 'john@example.com' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
        await signup(req, res);
    
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'All fields are required' });
      });
    
      // it('should create a new user and return 201', async () => {
      //   const req = { body: { firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password123' } };
      //   const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      
      //   const mockConnection = {
      //     query: jest.fn().mockImplementation((query, values, callback) => {
      //       callback(null, { insertId: 1 });
      //     }),
      //   };
      
      //   getConnection.mockResolvedValueOnce(mockConnection);
      //   bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');
      
      //   await signup(req, res);
      
      //   expect(res.status).toHaveBeenCalledWith(expectedStatusAndResponse.successfulSignupStatus);
      //   expect(res.json).toHaveBeenCalledWith(expectedStatusAndResponse.successfulSignupResponse);
      //   expect(bcrypt.hash).toHaveBeenCalledWith(...expectedStatusAndResponse.expectedBcryptHashCall);
      //   expect(mockConnection.query).toHaveBeenCalledWith(...expectedStatusAndResponse.expectedQueryCall);
      // });
      
    
      it('should return 500 if there is an error inserting the user', async () => {
        const req = { body: { firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password123' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const mockError = new Error('Database connection error');
    
        getConnection.mockResolvedValueOnce({
          query: jest.fn().mockImplementation((query, values, callback) => {
            callback(mockError);
          }),
        });
    
        await signup(req, res);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error inserting user into the database' });
      });
    });
