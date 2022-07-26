const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

const app = express();
const env = process.env;

dbConnection();

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/event'));

app.listen(env.PORT, () => {
    console.log(`Servidor funcionando, puerto: ${env.PORT}`);
});