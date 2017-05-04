var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose); //takes required PLM package and adds methods from PLM to UserSchema and allows user auth

module.exports = mongoose.model("User", UserSchema);