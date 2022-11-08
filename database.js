const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const DB = process.env.DATABASE;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Connection successfull");
}).catch((err)=>{
    console.log(err);
});


