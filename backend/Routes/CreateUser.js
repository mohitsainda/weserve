const express =require('express');
const router = express.Router();


const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt= require('bcryptjs')
const jwtSecret = "iamtheownerofthissite#@Y&"



router.post('/createuser',

   body('name',"Please Enter The Right Name With Atleast 5 Characters ").isLength({ min: 5}),
   body('email',"Please Enter The Valid Email ").isEmail(),
   body('password',"Password Must Have 6 Characters").isLength({ min: 6 })

,async (req, res)=>{
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password,salt);
   try {
    

     await   User.create({
            name:req.body.name,
            password:secPassword,
            email:req.body.email,
            location:req.body.location
        })
          res.json({success:true})
          
   } catch (error) {
      console.log(error)
      res.json({success:false})
   }
}
)

router.post('/loginuser',
   body('email',"Please Enter The Valid Email ").isEmail(),
   body('password',"Password Must Have 6 Characters").isLength({ min: 6 })

,async (req, res)=>{
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email= req.body.email;
   try {
    
   
    let userData = await User.findOne({email})
     if(!userData)
     {
      return res.status(400).json({ errors: "Try Login With Right Credentials"});
     }
     const pwdCompare = await bcrypt.compare(req.body.password,userData.password);
     if(!pwdCompare)
     {
      return res.status(400).json({ errors: "Try Login With Right Credentials"});
     }

     const data = {
      user:{
         id:userData.id
      }
     }
     const authToken= jwt.sign(data,jwtSecret)
    
      res.json({success:true,authToken:authToken})
   } catch (error) {
      console.log(error)
      res.json({success:false})
   }
}
)



module.exports = router;