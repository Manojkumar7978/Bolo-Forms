const mongoose=require('mongoose')

const question = new mongoose.Schema({
    FormId:{
        type:String,
        required:true
    },
    Questions:[]
 })

 
let questionModel = new mongoose.model('question',question)

module.exports = questionModel;
