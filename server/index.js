const express = require('express')
const cors = require('cors')
const main = require('./db/config.js');
const formModel = require('./db/form.model.js'); // model for new form
const categoriesQuestionModel = require('./db/categories.model.js');


const app = express()
app.use(express.json())

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

// api used for create categoriy type question with respective form
app.post('/categoriesquestion', async (req, res) => {
  const {questions,id } = req.body

  try {
    let allquestion = await categoriesQuestionModel.create({
      FormId: id,
      Questions:questions
    })
    res.send(allquestion)
  } catch (error) {
    res.send('Something went wrong')
  }
})

// api to get form details and questios by unique form name
app.get('/form',async (req,res)=>{
  let {title}=req.body
  try {
    let form=await formModel.find({Title:title})
    let categoriesQuestion=await categoriesQuestionModel.find({
      FormId:id
    })
    res.send({
      Form:form,
      categoryQuestion:categoriesQuestion
    })
  } catch (error) {
    res.send(error)
  }
})






const PORT = process.env.PORT || 8080


app.listen(PORT, () => {
  main();
  console.log(`App listen to ${PORT}`)
})