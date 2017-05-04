var mongoose = require("mongoose");

//USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId, //in the user schema there is a posts attribute and it is an array of object ids
            ref: "Post"
        }
    ]
});

module.exports = mongoose.model("User", userSchema);