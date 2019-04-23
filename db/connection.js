const knexConnect = require('knex');

const database = knexConnect({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Bakuman91',
        database: 'Razeft-db'
    }
});


module.exports = database;