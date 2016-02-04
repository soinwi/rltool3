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

personSchema.methods.sayHello = function(){ return "hello";};

personSchema.methods.getFastestTime = function(cb)
{
    if(this.results != null)
    {
         return this.results.sort(function(a,b){
                return a.time-b.time;
            })[0];
    }
    else
    {
        return null;
    }
    
};



var m = mongoose.model('person',personSchema);
module.exports = m;