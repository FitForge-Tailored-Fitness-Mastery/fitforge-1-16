import mysql from 'mysql';

let connection = null;

async function getConnection() {
  if (!connection) {
      return new Promise((resolve, reject) => {
          const connection = mysql.createConnection({
              host: process.env.DB_HOST,
              user: process.env.DB_USER,
              password: process.env.DB_PASSWORD,
              database: process.env.DB_DATABASE,
              port: process.env.DB_PORT
          });

          connection.connect((err) => {
              if (err) {
                  console.error('Error connecting to database: ', err);
                  reject(err);
                  return;
              }
              console.log('Connected to database!');
              resolve(connection);
          });
      });
  } else {
      return connection;
  }
}


export {getConnection};