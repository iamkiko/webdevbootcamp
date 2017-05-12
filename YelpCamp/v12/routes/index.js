var express = require("express");
var router = express.Router(); //a new instance of express router and adding routes to this router. 
var passport = require("passport");
var User = require("../models/user");
       
   
// ============================
// AUTH ROUTES
// ============================    
       
       
// ROOT ROUTE
router.get("/", function(req, res) {
    res.render("landing");
});

//show REGISTER form
router.get("/register", function(req, res){
    res.render("register");
});

//handle signup logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            req.flash("error", err.message); //let passport display error
            return res.render("register");
            }
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome aboard, " + user.username + "!");
                res.redirect("/campgrounds");
        });
    });
});

// show LOGIN form
router.get("/login", function(req, res){
    res.render("login");
});



//LOGIN route + logic
router.post("/login", passport.authenticate("local", 
    {    //passport authenticate middleware
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){ //not required
});


//LOGOUT route
router.get("/logout", function(req, res){
    req.logout(); // part of the packages
    req.flash("success", "Logged you out!"); //flash message
    res.redirect("/campgrounds");
});

module.exports = router; //returning/exporting router at the end