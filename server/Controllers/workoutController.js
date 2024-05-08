import { getConnection } from '../databaseConn.js';

export const getClientWorkouts = async (req, res) => {
  const connection = await getConnection();
  const client_id = req.params.clientId;
  const query = `
      SELECT c.fname, c.lname, w.date, w.duration, w.calories_burned, w.sets, w.description, e.name AS exercise_name
      FROM workouts w
      JOIN trainers_mapping tm ON w.trainer_mapping_id = tm.trainer_mapping_id
      JOIN clients c ON tm.client_id = c.client_id
      JOIN exercises e ON w.exercise_id = e.exercise_id
      WHERE c.client_id = ?
      ORDER BY \`date\` DESC
    `;
  connection.query(query, [client_id], (error, results, fields) => {
    if (error) {
        //console.error('Error querying the database: ', error);
        res.status(500).send('Error retrieving data from the database');
        return;
    }
    if (results.length === 0) 
    {
      res.status(404).send('Client not found');
      return;
    }    
    res.json(results);
  });
};

export const getClientFutureSessions = async (req, res) => {
  const connection = await getConnection();
  const client_id = req.params.clientId;
  const query = `
    SELECT
      c.fname,
      c.lname,
      b.date,
      b.duration
    FROM
      bookings b
      JOIN trainers_mapping tm ON b.trainer_mapping_id = tm.trainer_mapping_id
      JOIN clients c ON tm.client_id = c.client_id
    WHERE
      c.client_id = ?
      AND b.date > NOW()
      AND b.is_cancelled = FALSE
    ORDER BY
      b.date ASC
  `;

  connection.query(query, [client_id], (error, results, fields) => {
    if (error) {
      console.error('Error querying the database: ', error);
      res.status(500).send('Error retrieving data from the database');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('No future sessions found for the client');
      return;
    }

    res.json(results);
  });
};


describe('workoutController', () => {
  describe('getClientFutureSessions', () => {
    const mockFutureSessions = [
      {
        fname: 'Alice',
        lname: 'Johnson',
        date: '2024-05-10T21:00:00.000Z',
        duration: 90,
      },
      {
        fname: 'Alice',
        lname: 'Johnson',
        date: '2024-05-10T21:00:00.000Z',
        duration: 90,
      },
    ];

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should return an array of future sessions for a valid client', async () => {
      const req = { params: { clientId: '1' } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      getConnection.mockResolvedValueOnce({
        query: jest.fn().mockImplementation((_, __, callback) => {
          callback(null, mockFutureSessions, null);
        }),
      });

      await getClientFutureSessions(req, res);
      expect(res.json).toHaveBeenCalledWith(mockFutureSessions);
    });

    it('should return 404 if no future sessions are found for the client', async () => {
      const req = { params: { clientId: '2' } };
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

      await getClientFutureSessions(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith(
        'No future sessions found for the client'
      );
    });

    it('should return 500 if there is an error querying the database', async () => {
      const req = { params: { clientId: '1' } };
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

      await getClientFutureSessions(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(
        'Error retrieving data from the database'
      );
      //expect(console.error).toHaveBeenCalledWith('Error querying the database: ', mockError);
    });
  });
});