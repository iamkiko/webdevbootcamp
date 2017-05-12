var express = require("express");
var router = express.Router({mergeParams: true}); //a new instance of express router and adding routes to this router - MERGES PARAMS FROM CAMPGROUNDS AND COMMENTS TOGETHER SO THAT INSIDE THE COMMENT ROUTES, WE'RE ABLE TO ACCESS THE :id WE DEFINED
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// ============================
// COMMENTS ROUTES
// ============================

//COMMENTS NEW

router.get("/new", middleware.isLoggedIn, function(req, res){
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

router.post("/", middleware.isLoggedIn, function(req, res){
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
                    req.flash("success", "Successfully added comment!");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// EDITING COMMENT ROUTE

//comment edit route and edit button
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

//comment update route
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DELETE COMMENT ROUTE -> DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res){
   //findByIdAndRemove
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           
            res.redirect("back");
       } else {
            req.flash("success", "Comment deleted");
            res.redirect("/campgrounds/" + req.params.id);       
       }
   });
});


module.exports = router; //returning/exporting router at the end