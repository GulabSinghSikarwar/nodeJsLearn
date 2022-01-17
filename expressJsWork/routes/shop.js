const path=require('path');

const express = require('express');

const router=express.Router();


router.get( '/',(req,resp,next)=>{

    // resp.sendFile(path.join(__dirname,"../","views","shops.html"));

    //  now mvc 
    resp.render('shops',{title:'Shop'})

    console.log("in other middleware ");

    // resp.send(" <h1> Hello from express </h1> ")
    
})


module.exports=router