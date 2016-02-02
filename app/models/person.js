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
        remarks: String,
        timestamp: {type: Date, default: Date.now}
    }]
    
    
});

module.exports = mongoose.model('person',personSchema);