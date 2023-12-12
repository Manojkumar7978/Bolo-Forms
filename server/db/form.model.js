const mongoose=require('mongoose')

const formSchema = new mongoose.Schema({
    Title:{
        type:String,
        required:true
    }
 })

 
let formModel = new mongoose.model('form',formSchema)

module.exports = formModel;