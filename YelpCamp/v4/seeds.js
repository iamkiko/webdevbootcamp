var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment")

// starter data/seed data
var data =[
    {
        name: "Warm Breeze",
        image: "http://www.hotel-r.net/im/hotel/caribbean/do/ocean-breeze-4.jpg",
        description: "Warm ass breeze dawg."
    },
    {
        name: "Matterhorn's Rest",
        image: "http://cdn3.list25.com/wp-content/uploads/2015/06/2523-610x360.jpg",
        description: "Only for the mentally challenged"
    },
    {
        name: "Ascent of Death",
        image: "http://cdn1.theeventchronicle.com/wp-content/uploads/2015/05/volcanic-ring-of-fire.jpg",
        description: "For the clinically insane"
    }
]

// loop through data and create a campground for each

function seedDB() {
         //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err) {
            console.log(err);
        }
        console.log("Removed campgrounds.");
              //Add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Added a campground..");
                        // create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish I had internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err) {
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment.");
                                }
                            });
                    }
                });
            });
    });
        //Add a few comments
}

module.exports = seedDB;
