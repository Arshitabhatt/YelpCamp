var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    flash                   = require("connect-flash"),
    moment                  = require('moment'),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    methodOverride          = require("method-override"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    Campground              = require("./models/campgrounds"),
    Comment                 = require("./models/comments"),
    User                    = require("./models/user"),
    seedDB                  = require("./seeds");

var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments");
var indexRoutes = require("./routes/index");
    

mongoose.connect("mongodb+srv://Seeker:QRh1IbpobmgXZ9S1@cluster0-upagh.mongodb.net/test?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useCreateIndex: true
}).then(()=>{
    console.log("Connected to db");
}).catch(err=>{
    console.log("error:", err.message);
});
// mongoose.connect("mongodb://localhost/yelp_camp_v6",{useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname +"/public"));
//formal way of adding complete path 
app.use(methodOverride("_method"));
app.use(flash());
//seedDB(); //seed the database
app.locals.moment = require('moment');
//Passport configure

app.use(require("express-session")({
    secret: "Rivendell",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session()); 

app.use((req,res,next) =>{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
 });

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(indexRoutes);

// copy it all apps
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
    console.log("for local host it runs on http://127.0.0.1:3000/");
});