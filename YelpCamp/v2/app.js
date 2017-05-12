var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp"); //create yelpcamp db inside mongodb

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema ({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema); //creates model with above schema and has methods such as .find etc.

// Campground.create(
//     { 
//         name: "Granite Hill", 
//         image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg",
//         description: "Massive Granite hill, no bathrooms or water. Just nature."
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("NEW CAMPGROUND CREATED: ");
//             console.log(campground);
//         }
//     }
// )

       
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
             res.render("index", {campgrounds:allCampgrounds}); //data + name passing in
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
   res.render("new.ejs") 
});

//SHOW - shows more info about campground selected - to be declared after NEW to not overwrite
app.get("/campgrounds/:id", function(req, res){
    //find the campground with the provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
       if (err) {
           console.log(err);
       } else {
            //render show template with that campground
           res.render("show", {campground: foundCampground});
       }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server has started!");
});