// src/app/server.ts

import express from 'express';
import { mqttClient } from './mqtt/mqttService';
import { db } from '../../config/firebaseConfig'; // Import Firebase
import { ref, set } from 'firebase/database';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Endpoint pro odesílání dat na Firebase
app.post('/data', async (req, res) => {
    const sensorData = req.body;

    try {
        // Odeslání dat na Firebase
        const sensorRef = ref(db, 'sensors/device1'); // Odpovídající cesta ve Firebase
        await set(sensorRef, sensorData);
        res.status(200).json({ message: 'Data saved to Firebase' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Error saving data to Firebase' });
    }
});

// Spuštění serveru
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
