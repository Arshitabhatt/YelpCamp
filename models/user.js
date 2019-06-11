var mongoose = require("mongoose");
var passportLocalMongoose   = require("passport-local-mongoose")

var Userschema = new mongoose.Schema({
    name:String,
    password:String
});

Userschema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",Userschema);