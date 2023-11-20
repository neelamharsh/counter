const User = require('../db/model/users');
const express = require('express');

const router = express.Router();

router.post('/countAdjuster', async (req,res) => {
    const {userName,formattedDate,newValue} = req.body;
    const NewUser = new User({userName});
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
            return res.status(200).json({resCode:'400',message:err});
            });
        } else {
            NewUser.save()
            .then(item => {
            return res.status(200).json({message:"SignUp Successfully",resCode:200});
            })
            .catch(err => {
            return res.status(200).json({message:"SignUp Failed, If problem continues contanct sakshatkar",resCode:400});
            });
        }
    })
    .catch(err => {
        return res.status(200).json({message:"SignUp Failed, Try again or If problem continues contact sakshatkar",resCode:400});
    });

});

router.post('/getUserData', async (req,res) => {
    const {userName} = req.body;
    User.findOne({userName}).then((fetchedUser)=>{
        if(fetchedUser){
            return res.status(200).json({data:fetchedUser,resCode:200});
        } else {
            return res.status(200).json({resCode:'404',message:"No user found"});
        }
    })
    .catch(err => {
        return res.status(200).json({message:"SignUp Failed, Try again or If problem continues contact sakshatkar",resCode:402});
    });

});

module.exports = router;
