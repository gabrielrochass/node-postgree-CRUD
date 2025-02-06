const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ 
    host: 'db',
    port: 5432,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});

module.exports = pool;