// api/save-message.js

const { Client } = require('pg');

export default async (req, res) => {
    const { message } = req.body;
    const expirationTime = new Date(Date.now() + 12 * 60 * 60 * 1000); // 12 hours from now
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        await client.connect();
        const result = await client.query('INSERT INTO messages (message, expiration_time) VALUES ($1, $2) RETURNING *', [message, expirationTime]);
        res.status(200).json({ message: 'Message saved successfully', data: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save message' });
    } finally {
        await client.end();
    }
};
