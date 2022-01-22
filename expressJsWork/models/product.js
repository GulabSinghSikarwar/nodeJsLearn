const { error } = require('console');
const fs=require('fs');
const path=require('path')

var product =[];


module.exports=  class Product{
    constructor(title,price,imageUrl,description ){
        
        this.title=title;
        this.price=price;
        this.description=description;
        this.imageUrl=imageUrl;
        
       

    }
    save(){
        
      const p=path.join(
          path.dirname(process.mainModule.filename),
          'data',
          'products.json'


      )

        fs.readFile( p , (err,fileContent) =>
          { 
            // console.log(err);
            let  products=[];

            if (!err) {
                console.log(fileContent);
                products=JSON.parse(fileContent);
            }


            products.push(this);

            fs.writeFile(p, JSON.stringify(products),(error)=>{
                console.log(error );
            })


        })
    }
    static fetchProducts(cb){

        let p=path.join(
            path.dirname(process.mainModule.filename),
            'data',
            'products.json'
        )
        fs.readFile(
            p, ( err, fileContent )=>{
                if (err) {
                    cb([])
                }
                cb(JSON.parse(fileContent));

            }
        )

    //     let p=path.join(path.dirname(process.mainModule.filename),'data','products.json')
    //    fs.readFile(p,(err,data)=>{
    //        if (err) {
    //            cb([])
    //        }
    //     //    
    //         else if (data.length===0) {
    //             console.log(data.length);
    //         cb([])   
    //        }

    //       else { cb(JSON.parse(data))}

    //    })
        
        // return product;

        
   }
}