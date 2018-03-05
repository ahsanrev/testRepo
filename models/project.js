let mongoose = require('mongoose');

let projectSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    manger:{
        type: String,
        required: true
    },
    framework: {
        type: String,
        required: true
    },
    developers: []
})

var Project = module.exports = mongoose.model('Project', projectSchema)