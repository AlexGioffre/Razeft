const knexConnect = require('knex');

const database = knexConnect({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
        // host: '127.0.0.1',
        // user: '',
        // password: '',
        // database: ''
    }
});


module.exports = database;