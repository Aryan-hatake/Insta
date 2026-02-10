const mongoose = require("mongoose");

async function connectToDB() {

    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected")
    }
    catch(err){
        console.log("Connection Failed",err)
    }
    
}

module.exports = connectToDB