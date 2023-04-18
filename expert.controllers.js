const expertModel = require('../models/expert.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    saveExpert,
    getExpertByEmail,
    updateExpertByEmail, 
    expertLogin,
    getAllExpert,
    saveCommet

    }
 
 
 async  function saveExpert(req,res){
    console.log(req.body);
     body=req.body;
     var dataObj = new expertModel(req.body);
     console.log(dataObj)

     let expert = await expertModel.findOne({emailId:req.body.emailId})
     if(expert){
        return res.status(400).send({message:"expert already exists"})
     }

     
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
                 message: "Experts Details Saved Successfully..",
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



 
  
 async  function saveCommet(req,res){
    console.log(req.body);
     body=req.body;
     let expert = await expertModel.findOne({emailId:req.body.emailId})
     if(!expert){
        return res.status(400).send({message:"expert Email Id Does Not Exits"})
     }
     expert.comment.push({
        commentorname : req.body.commentorname,
        commentoremailid : req.body.commentorname,
        commentordate : req.body.commentordate,
        commentorcomment : req.body.commentorcomment
     })
     expertModel.findOneAndUpdate({emailId:req.body.emailId},{$set : expert },(err, docs)=>{
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
                message: "Comments are added Successfully..",
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
 
 
 function getExpertByEmail(req,res){
     console.log("Checking..");
     var query={emailId:req.params.emailId}
     console.log(query);
     expertModel.findOne(query,(err, docs)=>{
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
                 message: "Expert Details Getting Successfully..",
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
 
 
 function updateExpertByEmail(req,res){
  
   var query={emailId:req.params.emailId}
   
   dataObj = req.body;
   expertModel.findOneAndUpdate(query,{$set : dataObj },(err, docs)=>{
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
               message: "Updated Expert Details Successfully..",
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
 
//  function getExpertByEmail(req,res){
  
//     expertModel.find({emailId:req.params.emailId}

//     ).then(expert=>{
//         res.send(expert)
//     })
    
// 


function expertLogin(req, res) {
    // var modelType;
    // if(req.body.userRole == 'enthusiast')
    // {
    //  modelType  = enthusiastModel;
    // }
    // else
    // {
    // modelType  = expertModel;
    // }
    expertModel.findOne({emailId:req.body.emailId}).lean().exec((err,data)=>{  
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

function getAllExpert(req,res){
    console.log("Checking..");
    expertModel.find({},(err, docs)=>{
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
                message: "Expert Details Getting Successfully..",
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


  