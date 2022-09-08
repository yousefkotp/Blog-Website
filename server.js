const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
var _ = require('lodash');
const ejs = require("ejs");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser: true, useUnifiedTopology: true});

const postSchema  = new mongoose.Schema({
    title:String,
    text:String
})
const Post = mongoose.model("Post",postSchema);

const posts  = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname +'/public')));


const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Justo donec enim diam vulputate ut pharetra sit amet. Quam viverra orci sagittis eu volutpat odio. Odio morbi quis commodo odio aenean sed adipiscing diam. Arcu vitae elementum curabitur vitae nunc sed velit. Neque vitae tempus quam pellentesque nec nam aliquam sem. Iaculis at erat pellentesque adipiscing commodo elit. Scelerisque eu ultrices vitae auctor eu augue. Risus at ultrices mi tempus imperdiet nulla malesuada. Parturient montes nascetur ridiculus mus mauris vitae. Tortor posuere ac ut consequat semper viverra. Dignissim cras tincidunt lobortis feugiat. Leo integer malesuada nunc vel risus commodo viverra maecenas accumsan. Faucibus vitae aliquet nec ullamcorper sit amet. A pellentesque sit amet porttitor eget dolor. Luctus accumsan tortor posuere ac ut. Commodo elit at imperdiet dui accumsan sit amet. Turpis tincidunt id aliquet risus feugiat in ante.";
const contactContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget mi proin sed libero enim sed faucibus turpis. Libero id faucibus nisl tincidunt eget nullam. Ut morbi tincidunt augue interdum. Ullamcorper malesuada proin libero nunc consequat interdum varius sit amet. Varius morbi enim nunc faucibus a pellentesque sit amet porttitor. Morbi non arcu risus quis varius. Feugiat in ante metus dictum at tempor commodo ullamcorper. Tincidunt arcu non sodales neque sodales ut. Arcu bibendum at varius vel.";


app.get("/",function(req,res){
    Post.find({},function(err,posts){
        if(!err && posts){
            res.render(__dirname+"/views/index",{
                homeContent: homeStartingContent,
                posts:posts
            });
        }
    });

    
});


app.get("/about",function(req,res){
    res.render(__dirname+"/views/about",{
        aboutContent:aboutContent
    });
});

app.get("/contact",function(req,res){
    res.render(__dirname+"/views/contact",{
        contactContent:contactContent
    });
});


app.get("/posts/:postID",function(req,res){
    let requestedPostTitle = req.params.postID;
    Post.findById(requestedPostTitle,function(err,post){
        if(!err && post){
            res.render(__dirname+"/views/post",{
                postTitle:post.title,
                postContent:post.text
            });
        }
    });
});

app.get("/compose",function(req,res){
    res.render(__dirname+"/views/compose");
});

app.post("/compose",function(req,res){
    let newPost = new Post({
        title:req.body.titleInput,
        text:req.body.textInput
    })
    newPost.save();
    res.redirect("/");
});



app.listen(process.env.PORT || "3000" ,function(){
    console.log("Started Server on Port 3000");
});