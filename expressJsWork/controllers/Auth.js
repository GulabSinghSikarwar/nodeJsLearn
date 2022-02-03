exports.getAuthLogin = (req, resp, next) => {
    const cookie = req.get('Cookie');
    const session = req.session.isLoggedIn;
    console.log("Session : ", session);



    // if (cookie ) {
    //     const loggedIn = cookie.trim().split('=')[1];
    //     resp.render("Auth/login.ejs", { title: "login", isLoggedIn: loggedIn });
    // } else {
    //     const loggedIn = false
    //     resp.render("Auth/login.ejs", { title: "login", isLoggedIn: loggedIn });
    // }

    if (session) {
        // const loggedIn = cookie.trim().split('=')[1];
        resp.render("Auth/login.ejs", { title: "login", isLoggedIn: session });
    } else {
        const loggedIn = false
        resp.render("Auth/login.ejs", { title: "login", isLoggedIn: loggedIn });
    }

    // console.log(" cookie : ", cookie);
    // console.log(" loggedIn : ", loggedIn);

    // resp.render("Auth/login.ejs", { title: "login", isLoggedIn: loggedIn });
};
exports.postAuthLogin = (req, resp, next) => {
    console.log(" Login Data : ", req.body);
    req.isLoggedIn = true;


    // resp.setHeader('Set-Cookie', 'isLoggedIn=true')
    req.session.isLoggedIn = true;


    resp.redirect("/");
};