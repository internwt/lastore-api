const mongoose = require('mongoose');
var mongoUrl = 'mongodb://localhost:27017/'
function connectDB() {
    // Database connection 🥳
    mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log('Database connected 🥳🥳🥳🥳');
    }).catch(err => {
        console.log('Connection failed ☹️☹️☹️☹️');
    });
}

// mIAY0a6u1ByJsWWZ

module.exports = connectDB;