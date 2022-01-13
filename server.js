var  http =require('http')

 const server= http.createServer((req,resp)=>{
console.log("reequsest");
console.log('====================================');
console.log(req);
console.log('====================================');
})

server.listen(3000)
