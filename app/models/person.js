var mongoose = require("mongoose");

var personSchema = mongoose.Schema({
    name: {type: {
        first: String,
        last: String
    }, index:true},
    birthdate: Date,
    results: [{
        time: Number,
        track: String,
        remarks: String
    }]
    
    
});

module.exports = mongoose.model('person',personSchema);