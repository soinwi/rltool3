var mongoose = require("mongoose");

var personSchema = mongoose.Schema({
    name: {
        first: String,
        last: String
    },
    birthdate: Date,
    results: [{
        time: Number,
        track: String,
        remarks: String
    }]
    
    
});

module.exports = personSchema;