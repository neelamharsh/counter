const User = require('../db/model/users');
const express = require('express');

const router = express.Router();

router.post('/countAdjuster', async (req,res) => {
    const {userName,formattedDate,newValue} = req.body;
    const NewUser = new User({userName});
    console.log(userName);
    User.findOne({userName}).then((fetchedUser)=>{
        if(fetchedUser){
            let count = {...fetchedUser.count};
            let dayCount = {...count.dayCount};
            dayCount[formattedDate] = newValue;

            count.dayCount = dayCount;
            fetchedUser.count = count;
            fetchedUser.save()
            .then(msg => {
            return res.status(200).json({resCode:'200',message:"Authorised SignIn"});
            })
            .catch(err => {
            return res.status(200).json({resCode:'401',message:err});
            });
        } else {
            NewUser.save()
            .then(item => {
            return res.status(200).json({message:"SignUp Successfully",resCode:200});
            })
            .catch(err => {
            return res.status(200).json({message:err,resCode:402});
            });
        }
    })
    .catch(err => {
        return res.status(200).json({message:err,resCode:404});
    });

});

router.post('/getUserData', async (req,res) => {
    const {userName} = req.body;
    User.findOne({userName}).then((fetchedUser)=>{
        if(fetchedUser){
            return res.status(200).json({data:fetchedUser,resCode:200});
        } else {
            return res.status(200).json({resCode:'4041',message:"No user found"});
        }
    })
    .catch(err => {
        return res.status(200).json({message:err,resCode:401});
    });

});

module.exports = router;
