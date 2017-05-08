var express = require("express");
var app = express();

//ROUTES

app.get("/", function (req, res){
    res.send("Hi there, welcome to my assignment!");
});


app.get("/speak/:animal", function (req, res){
   var animal = req.params.animal.toLowerCase(); //to account for uppercase letters
// making an object to hold all animals and sounds
    var sounds = {
       pig: "Oink",
       cow: "Moo",
       dog: "Woof woof!",
       cat: "I hate you, human",
       fish: "fissshhh",
       justine: "chris go wash the dishes"
   }
   //storing the sounds in a variable by getting the object it is from
   var sound = sounds[animal];
   res.send("The " + animal + " says '" + sound + "'");
});


app.get("/repeat/:message/:times", function (req, res){
    var message = req.params.message;
    var times = Number(req.params.times); //string to number
    var result = ""; //variable to use in res.send as it can only be used once; this allows us to repeat through for loop
    
    for (var i = 0; i < times; i++) {
        result += message + " ";
    }
        res.send(result); 
});


app.get("*", function (req, res){
    res.send("Sorry, page not found. What are you doing with your life?");
});

// Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function () {
   console.log("starting server..") ;
});






