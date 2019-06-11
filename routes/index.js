var express = require("express");
    router = express.Router();
    passport = require("passport");
    User = require("../models/user");

router.get("/", function(req, res){
    res.render("landing");
    });

//++++++++++++++
//AUTH ROUTES
//++++++++++++++

// show register form
router.get("/register", function(req, res){
    res.render("register", {page: 'register'}); 
 });
//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        } else{passport.authenticate("local")(req, res, function(){
            req.flash("success", "Nice to meet you " + user.username + " !");
            res.redirect("/campgrounds"); 
         });
          //console.log(user);
        } 
        
    });
});
// show login page


 
 //show login form
 router.get("/login", function(req, res){
    res.render("login", {page: 'login'}); 
 });

//handling login logic

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login" 
}) ,(req,res) =>{
});

//logout route

router.get("/logout", (req,res)=>{
req.logout();
req.flash("success", "Logged you out !");
res.redirect("/campgrounds");
})


module.exports = router