const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb+srv://AgoraAdmin:Hirm5GSVgxo6FG9f@agora.rdysl.mongodb.net/AgoraData");
//mongodb+srv://AgoraAdmin:Hirm5GSVgxo6FG9f@agora.rdysl.mongodb.net/AgoraData


//check if database is connected or not
connect.then(() => {
    console.log("DB connected successfully");
})
.catch(() => {
    console.log("DB not connected :c");
});

//Create Schema
const loginSchema = new mongoose.Schema({
    userID:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
});


//Collection
const collection = new mongoose.model("users", loginSchema);

module.exports = collection;