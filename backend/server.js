const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
require('dotenv').config({path: envFile});
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 7000;
const connectDB = require('./config/db');
connectDB();

const userRoutes = require('./routes/userRoute');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/user', userRoutes);



app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})