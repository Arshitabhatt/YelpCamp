   var express = require("express");
       router = express.Router();
       Campground = require("../models/campgrounds");  
       middleware = require("../middleware");  
   /*++++++++++
     CAMPGROUNDS
     ++++++++++*/
    
    router.get("/campgrounds",  function(req, res){
        //get your  campground from db
        Campground.find({},function(err, allCampground){
            if(err){
                console.log(err);
            }
            else{
            res.render("campgrounds/index", {campgrounds: allCampground, currentUser: req.user});    
            }
        });
        //res.render("campgrounds", {campgrounds: allCampground});
    });
    
    // CREATE CAMPGROUND
   router.post("/campgrounds", middleware.isLoggedIn, function(req, res){
       var name = req.body.name;
       var price = req.body.price;
       var image = req.body.image;
       var desc = req.body.description;
       var author = {
           id: req.user._id,
           username: req.user.username
       }
       var newCampground = {name: name, price:price, image:image, description:desc, author: author};
       Campground.create(newCampground,function(err, newlyCreated){
            if(err){
            console.log(err);}
            else{
                //console.log(newlyCreated);
                req.flash("success", "Added a new campground!");
                res.redirect("/campgrounds"); 
            }    
       });
    
          
       });
//NEW CAMPGROUND      
// keep new above :id route or it will lead to same page
   router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res){
        res.render("campgrounds/new");
    });

//SHOW PAGE
   router.get("/campgrounds/:id", (req, res) => {
        Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
            if(err || !foundCampground)
           {   req.flash("error", "Campground not found");
               res.redirect("/campgrounds");
            }
           else{
               console.log(foundCampground);
            res.render("campgrounds/show", {campgrounds: foundCampground});
           }
        }); 
    });

//EDIT ROUTE
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, (req,res)=>{
    Campground.findById(req.params.id, (err, foundCampground)=>{
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});
    
//UPDATE ROUTE
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, (req,res)=>{
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updateCampground)=>{
        if(err|| !updateCampground){
            res.redirect("/campgrounds");
        } else{
            req.flash("success", "Updated the Campground");
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

// DESTROY ROUTE
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, (req, res)=>{
    Campground.findByIdAndRemove(req.params.id, (err, removeCampground)=>{
        if(err){
            console.log(err);
            res.redirect("/campgrounds/:id");
        } else{
            req.flash("success", "Campground deleted successfully!");
            res.redirect("/campgrounds");
        }

    });
});


    module.exports = router