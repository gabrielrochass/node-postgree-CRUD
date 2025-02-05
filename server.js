const express = require('express');
const pool = require('./db');
const port = 1337;

const app = express();
app.use(express.json());

// routes
app.get('/', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM schools');
        res.status(200).send({ children: data.rows });
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
});

app.post('/', (req, res) => {
    const { name, location } = req.body;
    try {
        pool.query('INSERT INTO schools (name, location) VALUES ($1, $2)', [name, location]);
        res.sendStatus(200).send('School added successfully!');
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
});

app.get('/setup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS schools (id SERIAL PRIMARY KEY, name VARCHAR(50), location VARCHAR(50))');
        
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});