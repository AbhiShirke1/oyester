const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String
    },

    username:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String
    }
    

})

const user = new mongoose.model("User", userSchema);
module.exports = user;