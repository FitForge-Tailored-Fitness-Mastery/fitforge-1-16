import {getConnection} from '../databaseConn.js';
import bcrypt from 'bcrypt';

const getClients = async (req, res) => {
  const connection = await getConnection();
  connection.query('SELECT * FROM clients', (error, results, fields) => {
    if (error) {
      console.error('Error querying the database: ', error);
      res.status(500).send('Error retrieving data from the database');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('No clients found');
      return;
    }

    res.json(results);
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate the input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Get database connection
    const connection = await getConnection();

    // Retrieve user from the clients table
    const query = `SELECT * FROM clients WHERE email = ?`;
    const users = await new Promise((resolve, reject) => {
      connection.query(query, [email], (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
      
    //const [users] = await connection.query(query, [email]);
   console.log(users);
    // Check if user exists
    if (users.length === 0) {
      return res.status(401).json({ error: 'No user found with this email' });
    }

    const user = users[0];
    
    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      // Password does not match
      return res.status(401).json({ error: 'Password is incorrect' });
    }

    // Password matches
    res.status(200).json({ message: 'User found and password is correct' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Validate the input
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Get database connection
    const connection = await getConnection();

    // Insert new user into the clients table
    const query = `
      INSERT INTO clients (fname, lname, email, role, is_assigned_trainer, password, created_at, updated_at)
      VALUES (?, ?, ?, 'client', 0, ?, NOW(), NOW())
    `;
    
    await new Promise((resolve, reject) => {
      connection.query(query, [firstName, lastName, email, hashedPassword], (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
      
      res.status(201).json({ message: 'User created successfully' });
          
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ error: 'Error inserting user into the database' });
  }
};


const getClientById = async (req, res) => {
  const connection = await getConnection();
  const client_id = req.params.id;
  connection.query(`SELECT c.*, tm.trainer_id FROM clients c left join 
      trainers_mapping tm ON tm.client_id = c.client_id 
      WHERE tm.client_id = ? and tm.dropped = 0`
  , [client_id], (error, results, fields) => {
    if (error) {
        console.error('Error querying the database: ', error);
        res.status(500).send('Error retrieving data from the database');
        return;
    }
    if (results.length === 0) 
    {
      res.status(404).send('Client not found');
      return;
    }    
    res.json(results[0]);
});
};

const getTrainerDetailsByTrainerId = async (req, res) => {
  const trainer_id = req.params.id;
  const connection = await getConnection();
  const query = `
    SELECT c.* FROM clients c
    WHERE c.client_id = ?
  `;
  connection.query(query, [trainer_id], (error, results) => {
    if (error) {
      console.error('Error querying the database: ', error);
      res.status(500).send('Error retrieving trainer data from the database');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Trainer not found for the client');
      return;
    }
    res.json(results[0]); // Send back the trainer details
  });
};

export { getClients, getClientById, getTrainerDetailsByTrainerId, signup, login };