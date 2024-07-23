const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3001
const app = express();
app.use(bodyParser.json())
app.use(cors());

const authRoutes = require('./routes/auth_routes');

app.use('/api/auth', authRoutes);

app.listen(PORT,() =>{
    console.log('Server running on Port', PORT);
})