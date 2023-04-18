let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let expertSchema = Schema({
       firstName:{
         type: String
        },
        lastName:{
          type: String
         },
         role:{
          type: String
         },
         specialization:{
          type: String
         },
        phoneNumber:{ 
            type: String
          },  
          educationalQualification:{
            type: String
           },
          aboutMe:{ 
              type: String
            }, 
            experience:{ 
              type: String
            },  
          avatarUrl:{ 
            type: String,
          }, 
          emailId:{
            type:String,
            unique: true
          }  ,
          password:{ 
            type: String
          },  
          comment:[
            {
              type : Object,
            }
          ],
          photo:{ 
            type: String
          },   
     },
{
    timestamps: true
})

module.exports = mongoose.model('expert', expertSchema);