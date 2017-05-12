var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds");
    // Comment     = require("./models/comments")
    

mongoose.connect("mongodb://localhost/yelp_camp_v3"); //create yelpcamp db inside mongodb
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

       
app.get("/", function(req, res) {
    res.render("landing");
});

//INDEX ROUTE - show all campgrounds
app.get("/campgrounds", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
        } else {
             res.render("campgrounds/index", {campgrounds:allCampgrounds}); //data + name passing in
        }   
        });
    
});

//CREATE - add new campgrounds to database
app.post("/campgrounds", function (req, res){
    // get data from form and add to campgrounds array
    var name= req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
   //create a new campground and save to db
   Campground.create(newCampground, function(err, newlyCreated){
      if (err) {
          console.log(err);
      } else {
           // redirect back to campgrounds page
          res.redirect("/campgrounds"); //
      }
   });
});

//NEW - show form to create new campground 
app.get("/campgrounds/new", function(req, res){
   res.render("campgrounds/new");
});

//SHOW - shows more info about campground selected - to be declared after NEW to not overwrite
app.get("/campgrounds/:id", function(req, res){
    //find the campground with the provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if (err) {
           console.log(err);
       } else {
            //render show template with that campground
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});


// ============================
// COMMENTS ROUTES
// ============================

app.get("/campgrounds/:id/comments/new", function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
       if(err){
            console.log(err);
       } else {
            res.render("comments/new", {campground: campground});
       } 
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
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

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server has started!");
});