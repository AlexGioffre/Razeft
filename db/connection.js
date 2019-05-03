const knexConnect = require('knex');

const database = knexConnect({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});


module.exports = database;