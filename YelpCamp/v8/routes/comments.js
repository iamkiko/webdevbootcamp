var express = require("express");
var router = express.Router({mergeParams: true}); //a new instance of express router and adding routes to this router - MERGES PARAMS FROM CAMPGROUNDS AND COMMENTS TOGETHER SO THAT INSIDE THE COMMENT ROUTES, WE'RE ABLE TO ACCESS THE :id WE DEFINED
var Campground = require("../models/campground");
var Comment = require("../models/comment");


// ============================
// COMMENTS ROUTES
// ============================

//COMMENTS NEW

router.get("/new", isLoggedIn, function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
       if(err){
            console.log(err);
       } else {
            res.render("comments/new", {campground: campground});
       } 
    });
});

//COMMENTS CREATE

router.post("/", isLoggedIn, function(req, res){
   // look up campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
        if(err){
            console.log(err);          
            } else {
                //add username and ID to comment
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
   // create new comments
   // connect new comment to campground
   // redirect to campground show page
});

//middleware to check about logged in or not
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router; //returning/exporting router at the end