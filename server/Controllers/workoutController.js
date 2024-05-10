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

