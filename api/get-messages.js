// api/get-messages.js

const { Client } = require('pg');

export default async (req, res) => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        await client.connect();
        const result = await client.query('SELECT * FROM messages');
        res.status(200).json({ messages: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    } finally {
        await client.end();
    }
};
