var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

var Post = require("./models/post"); // ./ is for current directory

var User = require("./models/user");



// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });

Post.create({
    title: "How to be a boss",
    content: "Be like Chris"
}, function (err, post){
    User.findOne({email: "bob@gmail.com"}, function(err, foundUser){ //finding the user with relevant email and if found, post is added to users' posts array
        if(err) {
            console.log(err);
        } else {
            foundUser.posts.push(post); //add post into users posts. push in the post created "cleaning up the mess"
            foundUser.save(function(err, data){
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        }
    });
});


//FIND USER 
//FIND POSTS FOR THAT USER

// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){ //finding a user and chaining this .populate posts which will populate the field 'posts', look up all the object ids, find correct data and stick it in the posts array
//     if(err) {  //then we run .exec to start the query, no call back, chaining .populate and .exec makes it all happen
//         console.log(err);
//     } else {
//         console.log(user);
//     }
   
// });




