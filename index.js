const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/monday', async (req, res) => {
    try {
        const response = await axios.post('https://api.monday.com/v2', req.body, {
            headers: {
                // 'Content-Type': 'application/json',
                'Content-Type': req.headers['content-type'],
                'Authorization': req.headers['authorization'],
                'API-Version': req.headers['api-version']
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { error: 'Server Error' });
    }
});

app.listen(7767, () => console.log('Proxy running on http://localhost:7767'));