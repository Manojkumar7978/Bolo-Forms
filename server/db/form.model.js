const mongoose=require('mongoose')

const formSchema = new mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    Img_Url:String
 })

 
let formModel = new mongoose.model('form',formSchema)

module.exports = formModel;