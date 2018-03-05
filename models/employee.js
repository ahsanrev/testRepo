let mongoose = require('mongoose');

let employeeSchema = mongoose.Schema({
    age:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
})

var Employee = module.exports = mongoose.model('Employee', employeeSchema)