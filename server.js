const express = require('express');
const pool = require('./db');
const port = 3000;

const app = express();
app.use(express.json());

// Get all schools
app.get('/', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM schools');
        res.status(200).json({ schools: data.rows });
    } catch (error) {
        res.status(500).send('Server error');
        console.log(error);
    }
});

// Add a new school
app.post('/', async (req, res) => {
    const { name, location } = req.body;
    try {
        await pool.query('INSERT INTO schools (name, location) VALUES ($1, $2)', [name, location]);
        res.status(201).send('School added successfully!');
    } catch (error) {
        res.status(500).send('Server error');
        console.log(error);
    }
});

// Update a school by ID
app.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, location } = req.body;
    try {
        const result = await pool.query('UPDATE schools SET name = $1, location = $2 WHERE id = $3 RETURNING *', [name, location, id]);
        if (result.rowCount === 0) return res.status(404).send('School not found');
        res.status(200).send('School updated successfully!');
    } catch (error) {
        res.status(500).send('Server error');
        console.log(error);
    }
});

// Delete a school by ID
app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM schools WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) return res.status(404).send('School not found');
        res.status(200).send('School deleted successfully!');
    } catch (error) {
        res.status(500).send('Server error');
        console.log(error);
    }
});

// Setup database (create table if not exists)
app.get('/setup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS schools (id SERIAL PRIMARY KEY, name VARCHAR(50), location VARCHAR(50))');
        res.status(200).send('Table setup completed.');
    } catch (error) {
        res.status(500).send('Server error');
        console.log(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
