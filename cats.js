var mongoose = require("mongoose");
mongoose.Promise = global.Promise; //overwrite promise error
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({ //create schema (pattern) of info for database
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema); //we took the schema (pattern) and compiled it into a model and saved it in to a variable called Cat.
//now we can use var Cat to do any amendments i.e. Cat.find or Cat.create (peer pattern)


//adding a new cat to DB

var george = new Cat({
    name: "George",
    age: 11,
    temperament: "grouchy"
});

george.save(function(err, cat){ //create callback function so we get feedback on whether it saved or got an error with parameters of error and success
    if(err) {
        console.log("something went wrong..");
    } else {
        console.log("we just saved a cat to the DB");
        console.log(cat);
    }
});


Cat.create({
   name: "Jerry",
   age: 15,
   temperament: "bland"
}, function(err, cat){
    if(err) {
        console.log(err);
    } else {
        console.log(cat);
    }
});

//retrieve all cats from the DB and console.log each one

Cat.find({}, function(err, cats){
    if(err) {
        console.log("you fucked up, man.");
        console.log(err);
    } else {
        console.log("ALL THE CATS...");
        console.log(cats);
    }
});
