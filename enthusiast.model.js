let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let enthusiastSchema = Schema({
       firstName:{
         type: String
        },
        lastName:{
          type: String
         },
        emailId:{
         type: String,
         unique: true
        },
        password:{ 
          type: String
        },  
        phoneNumber:{ 
            type: String
          },  
          avatarUrl:{ 
            type: String,
          },   
          photo:{ 
            type: String
          },   
     },
{
    timestamps: true
})

module.exports = mongoose.model('enthusiast', enthusiastSchema);