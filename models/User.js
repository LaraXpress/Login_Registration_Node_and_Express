const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    email : {
        type:String,
        required:true,
        unique:true,
        minlength:4,
        trim:true        
    },
    password : {
        type:String,
        required:true,
        minlength:5        
    },    
});
const User = mongoose.model('User',userSchema);
module.exports = User;
