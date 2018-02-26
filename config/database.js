const mongoose = require('mongoose');
const constants = require('./api.env');

mongoose.Promise = global.Promise;

try {
    mongoose.connect(constants.MongoDB_URL);
} catch (err) {
    mongoose.createConnection(constants.MongoDB_URL);
}

mongoose.connection.on('open', () => { console.log('API Connected to MongoDB Succesfully') })
    .on('error', (err) => { throw err });