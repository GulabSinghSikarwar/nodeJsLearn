exports.pageNotFound=(req,resp,next)=>{
    //    resp.status(404).sendFile(path.join(__dirname,"views","pageNotFound.html"))
        // resp.status(404).send("<h1> Page not Found </h1>")
        resp.status(404).render('pageNotFound',{title:"Page Not Found "})
    
    }