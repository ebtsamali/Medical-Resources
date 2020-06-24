const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const medicineRouter = require('./routes/medicine');
const governorateRouter = require('./routes/governorate');
const pharmacyRouter = require('./routes/pharmacy');
const {tokenMiddleware, authRouter} = require('./routes/auth');
const hospitalRouter = require('./routes/hospital');
const hospitalReservationRouter = require('./routes/hospitalReservation');
const bedRouter = require('./routes/bed');
const passport = require('passport');
const db = require('./models/index');
const User = db.user;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const DB_PORT = process.env.DB_PORT;
const DB_HOST = process.env.DB_HOST;
const DB_DATABASE = process.env.DB_DATABASE;
const PORT = process.env.PORT;

const app = express();

let corsOptions = {
    origin: `http://localhost:${process.env.CLIENT_PORT}`
};

app.use(cors(corsOptions));

// passport intialization
app.use(passport.initialize());

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

app.use(bodyParser.urlencoded({extended: false}));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// middleware that logs requests method and the url requested.
app.use((req, res, next) => {
    let date = new Date().toISOString().split('T');
    console.log(`\n\n${date[0]} ${date[1]}`);
    console.log(`new request, its method: ${req.method}`);
    console.log(`the url requested: ${req.url}\n`);
    next();
});

// Database Connection
mongoose.set('useCreateIndex', true);
mongoose.connect( `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}?replicaSet=rs0`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}, (err) => {
    if (!err) {
        console.log("Started connection to mongo");

    } else console.log(err);
});


passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `/auth/google/callback`,
        passReqToCallback: true
    },
    function (request, accessToken, refreshToken, profile, done) {
        const user = {
            firstName: profile._json.given_name,
            lastName: profile._json.family_name,
            email: profile._json.email,
            role: 'user'}
        User.findOrCreate({ email: profile._json.email },user, function (err, user) {
            console.log( profile._json.email,user)
            console.log(err)
            return done(err, user);
        });
    }
));






// Initiating the Server
app.listen(PORT, (err) => {

    if (!err) {
        console.log(`App Started on port: ${PORT}`);
    }

});

app.use(tokenMiddleware);
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/hospitals', hospitalRouter);
app.use('/pharmacys', pharmacyRouter);
app.use('/medicines', medicineRouter);
app.use('/governorates', governorateRouter);
app.use('/hospital-reservation', hospitalReservationRouter);
app.use('/beds', bedRouter);

