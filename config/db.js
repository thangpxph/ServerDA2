const mongoose = require('mongoose');
const MONGO_URI =
    "mongodb+srv://thangpx:123456aA@cluster0.bntsa.mongodb.net/quantri?retryWrites=true&w=majority";
const connectDB = async () => {
    const conn = await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
};
module.exports = connectDB;