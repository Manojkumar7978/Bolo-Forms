const express = require('express')
const cors = require('cors')
const main = require('./db/config.js');
const formModel = require('./db/form.model.js'); // model for new form
const questionModel = require('./db/question.js');
require('dotenv').config()


const app = express()
app.use(express.json())
app.use(cors())
// api used for create a new form in the database
app.post('/forms', async (req, res) => {
  const { title } = req.body;
  try {
    const existingForm = await formModel.findOne({ Title: title });

    if (existingForm) {
      return res.status(400).json({ message: 'Form name already exists. Please enter a different name.' });
    } else {
      const newForm = await formModel.create({ Title: title })
      res.send(newForm)
    }
  } catch (error) {
    res.send(error)
  }
});

// api to delete form
app.delete('/form/:id',async (req,res)=>{
  let {id}=req.params
  try {
    let x=await formModel.findByIdAndDelete(id)
    res.send(x)
  } catch (error) {
    res.send(error)
  }

})

// api to edit form details
app.patch('/form/:id',async(req,res)=>{
  let {id}=req.params
  let {url}=req.body
 try {
  await formModel.findByIdAndUpdate(id,{
    Img_Url:url
  })
  res.send('Image Updated Sucessfully')
 } catch (error) {
  res.send(error)
 }
})
// api to get all form 
app.get('/allForm',async (req,res)=>{
  try {
      let data=await formModel.find()
      res.send(data)
  } catch (error) {
    res.send(error)
  }
})

app.get('/allQuestion/:id',async (req,res)=>{
  let {id}=req.params
  console.log(id)
  try {
    let response=await  questionModel.find({
      FormId:id
    })
    console.log(response)
    res.send(response)
  } catch (error) {
    res.send(error)
  }
})


// to create questions or update the question of respective form

app.patch('/submit',async (req,res)=>{
  let {Questions,FormId}=req.body
  try {
    const existingForm = await questionModel.findOne({ FormId });
    if(existingForm) {
      const updatedForm = await questionModel.findOneAndUpdate(
        { FormId },
        { Questions },
        { new: true }
      );

      res.send(updatedForm);
    }else{
      const response = await questionModel.create({
        FormId,
        Questions
      });

      res.send(response);
    }
  } catch (error) {
    res.send(error)
  }
})


const PORT = process.env.PORT || 8080


app.listen(PORT, () => {
  main();
  console.log(`App listen to ${PORT}`)
})