const mongoose = require('mongoose');
var mongoUrl = 'mongodb+srv://lastore:Lastore%40123@cluster0.glqyi.mongodb.net/lastore?authSource=admin&replicaSet=atlas-rizg3t-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'
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