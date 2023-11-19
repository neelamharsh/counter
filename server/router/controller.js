const User = require('../db/model/users');
const express = require('express');

const router = express.Router();

router.post('/countAdjuster', async (req,res) => {
    console.log("Working", req.body);

    const {userName,formattedDate,newValue} = req.body;
    const NewUser = new User({userName});
    console.log("Working - 2", NewUser);
    User.findOne({userName}).then((fetchedUser)=>{
        if(fetchedUser){
            console.log(formattedDate);
            console.log(fetchedUser.count);
            
            let count = {...fetchedUser.count};
            let dayCount = {...count.dayCount};
            dayCount[formattedDate] = newValue;

            count.dayCount = dayCount;
            fetchedUser.count = count;
            console.log("msg");
            fetchedUser.save()
            .then(msg => {
                console.log(msg);
            return res.status(200).json({err:'200',message:"Authorised SignIn"});
            })
            .catch(err => {
            return res.status(200).json({err:'400',message:err});
            });
        } else {
            NewUser.save()
            .then(item => {
            return res.status(200).json({message:"SignUp Successfully",status:200});
            })
            .catch(err => {
            return res.status(200).json({message:"SignUp Failed, If problem continues contanct sakshatkar",status:400});
            });
        }
    })
    .catch(err => {
        return res.status(200).json({message:"SignUp Failed, Try again or If problem continues contact sakshatkar",status:400});
    });

});

router.post('/getUserData', async (req,res) => {
    console.log("Working", req.body);

    const {userName} = req.body;
    User.findOne({userName}).then((fetchedUser)=>{
        if(fetchedUser){
            return res.status(200).json({data:fetchedUser,message:"Authorised SignIn"});
        } else {
            return res.status(200).json({data:'404',message:"No user found"});
        }
    })
    .catch(err => {
        return res.status(200).json({message:"SignUp Failed, Try again or If problem continues contact sakshatkar",status:400});
    });

});

module.exports = router;
