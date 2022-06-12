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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post("/register",(req,res)=>{
    const user     = new User();
    user.email     = req.body.email;
    user.password  = req.body.password;

    bcrypt.genSalt(10,(err,salt)=>{

        bcrypt.hash(user.password, salt, (err, hash)=>{
            if(err) return err;
            user.password = hash;
            user.save().then(userSaved=>{
                res.send("User has been added successfully!")
            }).catch(err=>{
                res.send('Sorry!,failed to add' + err)
            });
        })
    })  
})

app.post("/login",(req,res)=>{
    User.findOne({email : req.body.email}).then(user=>{
        if(user){
            bcrypt.compare(req.body.password, user.password, (err,matched)=>{
                if(err) return err;
                if(matched){
                    res.send('User was able to LOGIN')
                }else{
                    res.send('NOT ALLOWED TO LOGIN')
                }
            })
        }
    })
})

const port = 8080 || process.env.PORT;
app.listen(port, (req,res)=>{
    console.log(`Server is running at port ${port}`);
})
