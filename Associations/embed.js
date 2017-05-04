var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

//POST - title, content

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);

//USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);



// var newUser = new User ({
//     email: "magic@brown.edu",
//     name: "Zasmar Magic"
// });

// newUser.posts.push({
//     title: "Make magic motherfucker.",
//     content: "Jokes, a true magician never reveals this shit dawg."
// });


// newUser.save(function(err, user){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// var newPost = new Post ({
//     title: "Reflections on Apples",
//     content: "They're alright."
// });

// newPost.save(function(err, post){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });

User.findOne({
   name: "Zasmar Magic"
}, function(err, user){
    if (err) {
        console.log(err);
    } else {
        user.posts.push ({   // code to add new posts
            title: "I hate Essex",
            content: "No fuck Essex, thats all man."
        }); 
        user.save(function(err, user){ //this user has new data already added
            if (err) {
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});