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



personSchema.methods.getFastestTime = function(cb)
{
    this.model('person').findById(this.id, function(err,p){
        p.results.find().sort('time').exec(function(err,res){
    //this.results.findOne().sort('time').exec(function(err,res){
    //this._doc.results.findOne().sort('time').exec(function(err,res){
        cb(err,res);
    });
    });
}

var m = mongoose.model('person',personSchema);
module.exports = m;