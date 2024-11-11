const mongoose = require('mongoose');
const url = "mongodb+srv://Janmejay:janmejay11@cluster0.adil6.mongodb.net/School_Management?retryWrites=true&w=majority&appName=Cluster0";

const connectDb = async () => {
    try {
        await mongoose.connect(url);
        console.log("Connection Successfull");
    } catch (error) {
        console.error("Db Connection failed");
        process.exit(0);
    }
}
module.exports = connectDb;