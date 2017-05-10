var express = require("express");
var app = express();

//telling express to serve public directory where our CSS is based
app.use(express.static("public"));

//telling it to look out for ejs
app.set("view engine", "ejs");


app.get('/', function(req, res){
    res.render("home");
});

app.get('/fallinlovewith/:thing', function(req,res){
   var thing = req.params.thing;
   res.render("love", {thingVar: thing });
});

app.get('/posts', function(req,res) {
    var posts = [ 
        {title: "Post 1", author: "Susy",    },
        {title: "Bunnies", author: "Sasha",    },
        {title: "Fat Loss Tricks", author: "John"    }
        ]
    res.render("posts", {posts: posts});
});

app.listen(process.env.PORT, process.env.IP, function (){
    console.log("starting server...")
});