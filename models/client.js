let mongoose = require('mongoose');

let ClientSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    projectNames: []
    
})

var Client = module.exports = mongoose.model('Client', ClientSchema)