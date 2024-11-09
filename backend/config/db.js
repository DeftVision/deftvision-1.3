const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected to MongoDB');
    } catch {
        console.log('MongoDB connection error');
    }
}

module.exports = connectDb;