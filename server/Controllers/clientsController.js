import {getConnection} from '../databaseConn.js';

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

export { getClients };
