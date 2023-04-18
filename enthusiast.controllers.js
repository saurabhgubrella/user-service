const enthusiastModel = require('../models/enthusiast.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {
    saveEnthusiast,
    getEnthusiastByEmail,
    updateEnthusiastByEmail ,
     enthusiastLogin,
   

    }
 
 
 async  function saveEnthusiast(req,res){
     console.log(req.body);
     body=req.body;
     var dataObj = new enthusiastModel(req.body);
     console.log(dataObj)
     dataObj.save(async(err, docs)=>{
         if (err) {
             if (err.message.toString().includes("duplicate")) {
                 res.send({ isSuccess: false, message: "Email Id Already Exits" })
             }
           }
        else if(docs != null)
         {
             console.log(docs);
             res.status(200).json({
                 message: "Enthusiast Details Saved Successfully..",
                 data : docs,
                 isSuccess: true,
             });
         }
         else{
             res.status(400).json({
                 message: " Save Failed Try Again..",
                 isSuccess: false,
             });
         }
 
     })
 }
 
 
 function getEnthusiastByEmail(req,res){
     console.log("Checking..");
     var query={emailId:req.params.emailId}
     console.log(query);
     enthusiastModel.findOne(query,(err, docs)=>{
        
         if(err)
         {
             res.status(404).json({
                 message: "Error In Getting Details",
                 
                 err : err,
                 isSuccess: false,
             });
         }
       else if(docs != null)
         {
             res.status(200).json({
                 message: "Enthusiast Details Getting Successfully..",
                 data : docs,
                 isSuccess: true,
             });
         }
         else{
             res.status(400).json({
                 message: "Error In Getting Details",
                 isSuccess: false,
             });
         }
     })
 }
 
 
 function updateEnthusiastByEmail(req,res){
   console.log("updateEnthusiastByEmail")
   var query={emailId:req.params.emailId}
   
   dataObj = req.body;
   enthusiastModel.findOneAndUpdate(query,{$set : dataObj },(err, docs)=>{
       if(err)
       {
           res.status(404).json({
               message: "Error In Getting Details",
               err : err,
               isSuccess: false,
           });
       }
     else if(docs != null)
       {
           res.status(200).json({
               message: "Updated Enthusiast Details Successfully..",
               isSuccess: true,
           });
            
       }
       else{
           res.status(400).json({
               message: "Error In Deleted Details",
               isSuccess: false,
           });
       }
   })
 }

 
 function enthusiastLogin(req, res) {
    // var modelType;
    // if(req.body.userRole == 'enthusiast')
    // {
    //  modelType  = enthusiastModel;
    // }
    // else
    // {
    // modelType  = expertModel;
    // }
    console.log(req.body);
    enthusiastModel.findOne({emailId : req.body.emailId}).lean().exec((err,data)=>{  
        console.log(data)
        console.log("error"+err)
        if(err)
        {
        console.log("error....");
        console.log("error"+err);
        }
        else if(data == null)
        res.status(200).json({ status: false, message: "Email Is Not Registered" });
        else 
        {
            
                 if(req.body.password == data.password)
                  {
                        jwt.sign({ user: data }, "jwtSecretKey", { expiresIn: '30d' }, async function (err, token) {
                            
                            console.log("token", token)
                            if (err) {
                                console.log("login err", err)
                                res.json({
                                    status: false,
                                    message: 'Invalid login credentials',
                                })
                            } else {
                                console.log("Login Successfull " + data._id + "----------------------------");
                                // data.lastLoginTime = new Date();
                                delete data.password;
                                delete data.isActive;
                                res.send({
                                    status: true,
                                    message: 'Login Successfull',
                                    token: token,
                                    data: data,
        
                                });
                             }
                        })
                } 
                     else
                     {
                    res.send({ status: false, message: "Invaild Credentials" });
                    }
           
        }
    })
}

 