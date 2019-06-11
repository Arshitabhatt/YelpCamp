var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments");
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://www.grandcanyon.net/images/havasupai-falls-river.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]
function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        //added to the callback to guarntee the campgrounds are being added
        console.log("hawww!!! campgrounds gone!"); 
        // add new camogrounds
        data.forEach(function(seed){
            Campground.create(seed,function(err,campground){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("added a new campground");
                    //add comments
                    Comment.create({
                        text:"I love camping in woods", 
                        author:"Arshi"
                    },function(err,comment){
                        if(err){
                            console.log(err)
                        }else{
                            campground.comments.push(comment)
                            campground.save();
                            console.log("comment added");
                        }
                        
                    });
                }
            });
        });
    });

}
module.exports = seedDB;