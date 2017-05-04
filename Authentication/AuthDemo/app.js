var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");

    
mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true})); //required for forms that post data via request
app.use(require("express-session")({ //require inline exp session
    secret: "be rich forever", //used to encode and decode data during session (it's encrypted)
    resave: false,          // required
    saveUninitialized: false   //required
}));

// code to set up passport to work in our app -> THESE TWO METHODS/LINES ARE REQUIRED EVERY TIME
app.use(passport.initialize());
app.use(passport.session());

//plugins from passportlocalmongoose in user.js file
passport.use(new LocalStrategy(User.authenticate())); //creating new local strategy with user authenticate from passport-local-mongoose
passport.serializeUser(User.serializeUser()); //responsible for encoding it, serializing data and putting it back into session
passport.deserializeUser(User.deserializeUser()); //responsible for reading session, taking data from session that is encoded and unencoding it

//=======================================================================================================
//ROUTES
//=======================================================================================================


app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

//=======================================================================================================
// AUTHENTICATION ROUTES
//=======================================================================================================

//show sign up form
app.get("/register", function(req, res){
    res.render("register");
});

//handling user sign up
app.post("/register", function(req, res){
    req.body.username;
    req.body.password;
    User.register(new User({username: req.body.username}), req.body.password, function (err, user){ //create new user object (only username is passed b/c password is not saved to database). we pass password as 2nd argument to User.register -> takes new user -> hash password (encrypts, store in database) -> it will return a new user that has everything inside of it (object)
        if(err) {
            console.log(err);
            return res.render("register");
        } 
        passport.authenticate("local")(req, res, function(){ //logs the user in and takes care of everything in session and runs serializeuser method
            res.redirect("/secret");
        });
    });
});

// LOGIN ROUTES

//render login form
app.get("/login", function(req, res){
    res.render("login");
});

//login logic
app.post("/login", passport.authenticate("local", { //used inside app.post as (middleware - code that runs before final callback)
        successRedirect: "/secret",
        failureRedirect: "/login",
    }), function(req, res){
});

app.get("/logout", function(req, res){
    // res.send("TESTING");
    req.logout(); //logs them out via passport
    res.redirect("/");
});

function isLoggedIn(req, res, next) { //next is the next thing that needs to be called.
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started...");
});