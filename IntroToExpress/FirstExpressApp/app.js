var express = require("express");

var app = express();

//ROUTES

// "/" -> "Hi There!"
app.get("/", function (req, res){
    res.send("Hi there!");
});

// "bye" -> "Goodbye!"
app.get("/bye", function (req, res){
   res.send("Goodbye!") ;
});

// "dog" -> "MEOW!"
app.get("/dog", function (req, res){
   res.send("MEOW!") ;
});

// for any other pages that are not live -> ERROR MESSAGE like 404 -> it overwrites
app.get("*", function(req, res){
    res.send("You are a star!");
});

// Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function (){  //environment variable (port) that return cloud9s port + default hostname
    console.log("Server has started sir.");
});


