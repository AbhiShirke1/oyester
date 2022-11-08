const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: "Please enter details in this field"
    },
    
    email:{
        type: String,
        required: "Please enter details in this field"

    },

    mobile:{
        type: String,
        required: "Please enter details in this field"

    },

    city:{
        type: String,
        required: "Please enter details in this field"

    }
})

const Student = new mongoose.model("Student", studentSchema);
module.exports = Student;