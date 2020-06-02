const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

const DB_PORT = process.env.DB_PORT;
const DB_HOST = process.env.DB_HOST;
const DB_DATABASE = process.env.DB_DATABASE; 
const PORT = process.env.PORT;

const app = express();

let corsOptions = {
  origin: `http://localhost:${process.env.CLIENT_PORT}`
};

app.use(cors(corsOptions));

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

app.use('/auth', authRouter);
app.use('/users', userRouter);