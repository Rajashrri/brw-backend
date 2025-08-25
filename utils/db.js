const mongoose = require("mongoose");
//const URI = "mongodb://127.0.0.1:27017/Mern";
const URI = "mongodb+srv://rajashrichougule:9pqmjMI3blFG80D5@cluster0.kv5nlkj.mongodb.net";
// mongoose.connect(URI);

const connectDB = async () => {
    try {

       await mongoose.connect(URI);
       console.log('connection successful to DB');
        
    } catch (error) {

        console.error(error,"databse connection failed");
        process.exit(0);
        
    }
};

module.exports = connectDB; 
