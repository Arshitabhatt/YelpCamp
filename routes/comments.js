var express = require("express");
    router = express.Router();
    Campground = require("../models/campgrounds");
    Comment = require("../models/comments");
    middleware = require("../middleware"); 

/*+++++++++++++++++
    COMMENTS
+++++++++++++++++*/

 // GET COMMENT   
 router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, (req, res) =>{
    Campground.findById(req.params.id, (err, campground) =>{
       if(err){
           console.log(err);
       } 
       else{
           res.render("comments/new", {campgrounds : campground });
       }
    });
    
});
// POST COMMENT
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, (req, res) => {
    // look uo campground
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, (err, comment) =>{
                if(err){
                    req.flash("error", "Something went wrong!");
                    console.log(err);
                }
                else{
                    // associate comment 
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                   campground.comments.push(comment);
                   campground.save();
                   console.log(comment);
                   req.flash("success", "Successfully added comment");
                   res.redirect("/campgrounds/" + req.params.id);
                }
            });
          
        }
    });
    
});

//EDIT COMMENT ROUTE
router.get("/campgrounds/:id/comment/:comment_id/edit", middleware.checkCommentOwnership, (req,res)=>{
    Campground.findById(req.params.id, (err,foundCampground) =>{
        if(err || !foundCampground){
            req.flash("error", "No campground found");
            return res.redirect("/campgrounds");
        }
        Comment.findById(req.params.comment_id, (err, foundCommment)=>{
            if(err){
                res.redirect("back");
            } else{
            res.render("comments/edit", {campgrounds_id: req.params.id, comment: foundCommment})
            }
        }); 
    });   
});
//UPDATE COMMENT ROUTE
router.put("/campgrounds/:id/comment/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) =>{
        if(err|| !updatedComment){
            req.flash("error", "Comment not found")
            res.redirect("back");
        } else{
            req.flash("success", "Comment updated");
            res.redirect("/campgrounds/" + req.params.id);
        }

    });
 });
// DELETE COMMENT ROUTE
router.delete("/campgrounds/:id/comment/:comment_id", middleware.checkCommentOwnership, (req, res)=>{
    Comment.findByIdAndRemove(req.params.comment_id, (err) =>{
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted successfully!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router