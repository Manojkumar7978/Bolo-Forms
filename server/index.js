const express=require('express')
const cors=require('cors')
const main=require('./db/config.js')



const app=express()


app.get('/',(req,res)=>{
    res.send('hii')
})



const PORT=process.env.PORT || 8080


app.listen(PORT,()=>{
    main();
    console.log(`App listen to ${PORT}`)
})