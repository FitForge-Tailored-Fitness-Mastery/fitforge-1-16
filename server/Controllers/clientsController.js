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
    res.json(results);
});
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

    
    const result = await connection.query(query, [firstName, lastName, email, hashedPassword]);
          
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export { getClients, signup };
