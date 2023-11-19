
const mongoose = require('mongoose');

const Users
= new mongoose.Schema({
    userName:{
        type:String,
    },
    count:{
        type:Object,
        default:{
            dayCount:{},
        }
    }
})

// const User U should be capital
const UserSchema
= mongoose.model('registeredUsers',Users);

module.exports = UserSchema;