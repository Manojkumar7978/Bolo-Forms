const mongoose=require('mongoose')

const categoriesQuestion = new mongoose.Schema({
    FormId:{
        type:String,
        required:true
    },
    Questions:{
        type:[
            {
                Title:{
                    type:String,
                    required:true
                },
                Categories:{
                    type:[String],
                    required:true   
                },
                Items:{
                    type:[
                        {
                            name:String,
                            belongsto:String
                        }
                    ],
                    required:true   
                }
            }
        ],
        required:true
    }
 })

 
let categoriesQuestionModel = new mongoose.model('categoryQuestion',categoriesQuestion)

module.exports = categoriesQuestionModel;
