var mongoose    = require("mongoose");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema ({
    name: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [ //embedding a reference to the comments
        {
            type: mongoose.Schema.Types.ObjectId, //
            ref: "Comment" // name of the model
        }
    ]
});

module.exports = mongoose.model("Campground", campgroundSchema); //creates model with above schema and has methods such as .find etc.