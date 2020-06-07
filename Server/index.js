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

const DB_PORT = process.env.DB_PORT;
const DB_HOST = process.env.DB_HOST;
const DB_DATABASE = process.env.DB_DATABASE; 
const PORT = process.env.PORT;

const app = express();

let corsOptions = {
  origin: `http://localhost:${process.env.CLIENT_PORT}`
};

app.use(cors(corsOptions));


app.use(bodyParser.urlencoded({extended: false}));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

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
mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, (err) => {
  if (!err) {
    console.log("Started connection to mongo");

  }
  else console.log(err);
});

// Initiating the Server
app.listen(PORT, (err) => {

    if(!err) {
        console.log(`App Started on port: ${PORT}`);
    }
    
});

// require("./routes/auth")(app);
app.use(tokenMiddleware);
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/hospitals', hospitalRouter);
app.use('/pharmacys', pharmacyRouter);
app.use('/medicines', medicineRouter);
app.use('/governorates', governorateRouter);
