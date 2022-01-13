const path = require('path');
const express=require('express')
const router =express.Router();


//   /admin/add-products => GET request 


router.get('/add-products',(req,resp,next)=>{
    resp.sendFile(path.join(__dirname,"../","views","add-products.html"))



    //   resp.send('<html> <form action ="/admin/add-products" method="POST"><input type="text" name="title"><button type="submit"> Submit</button>  </form></html>')

});


// /admin/add-products ==>POST request 


router.post('/add-products',(req,resp,next)=>{
  
    console.log(req.body);
    resp.redirect('/');
    

})
module.exports=router;
