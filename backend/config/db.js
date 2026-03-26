const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
    try {
        let uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/devtrack';
        
        try {
            // try connecting to local mongo first
            const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
            console.log(`MongoDB connected: ${conn.connection.host}`);
        } catch (localErr) {
            // if local mongo isn't running, fall back to in-memory server
            console.log('Local MongoDB not available, using in-memory server...');
            const mongoServer = await MongoMemoryServer.create();
            uri = mongoServer.getUri();
            const conn = await mongoose.connect(uri);
            console.log(`In-memory MongoDB connected: ${conn.connection.host}`);
            // TODO: add warning that data wont persist with in-memory db
        }
    } catch (err) {
        console.error(`DB connection error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
