const express   = require("express");
const app       = express();
const mongoose  = require("mongoose");
const User      = require("./models/User");
const bodyParser= require("body-parser");
const bcrypt    = require("bcryptjs");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/test");
mongoose.connection
    .once('open',()  => console.log('CONNECTED'))
    .on('error',(err)=> console.log('Disconnected!',err));

const port = 8080 || process.env.PORT;
app.listen(port, (req,res)=>{
    console.log(`Server is running at port ${port}`);
})
