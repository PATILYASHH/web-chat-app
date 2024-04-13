// api/delete-expired-messages.js

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
        const result = await client.query('DELETE FROM messages WHERE expiration_time < NOW()');
        res.status(200).json({ message: 'Expired messages deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete expired messages' });
    } finally {
        await client.end();
    }
};
