const mongoose = require("mongoose")
const db = "mongodb+srv://govindpurty350:govind@cluster0.emvdt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDB = async() => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
        
            
        });
        console.log("mongodb is connected");
        
    } catch (error) {
        console.log(error.message);
        process.exit(1);
        
    }
}

module.exports = connectDB;