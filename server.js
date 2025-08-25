require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
// const host =' 192.168.1.94';
const authRoute = require("./router/auth-router");
const customerRoute = require("./router/customer-router");
const profileRoute = require("./router/profile-router");
const productRoute = require("./router/product-router");
const privilegeRoute = require("./router/privilege-router");
const csvRoute = require("./router/csv-router");
const customerloginRoute = require("./router/customerauth-router");
const formmoduleRoute = require("./router/formmodule-router");
const crudRoute = require("./router/crud-router");
const domainRoute = require("./router/domain-router.js");
const customRoute = require("./router/custom-router.js");
const packageRoute = require("./router/package-router");
const knowledgebaseRoute = require("./router/knowledgebase-router.js");
const comingsoonRoute = require("./router/comingsoon-router.js");

const creatorclubRoute = require("./router/creatorclub-router");

const _dirname = path.resolve();
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/validate-middleware");
const errorMiddleware1 = require("./middlewares/error-middleware");

// //for googlesignup 
// const passport = require("passport");
// const session = require("express-session");
// require("./passport");

// app.use(session({
//     secret: process.env.JWT_SECRET_KEY1 || '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',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         maxAge: 24 * 60 * 60 * 1000, // 1 day
//         httpOnly: true,
//         secure: false, // true only if you have HTTPS
//         sameSite: 'lax',
//     }
// }));

// // Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session());

// handling cors
const corsoptions = {
	origin:['http://localhost:3000','http://localhost:3001','https://comingsoon.digihostinfra.com','https://theme.digihostinfra.com','https://admin.digihostinfra.com'  ,
		'https://creator-club.digihostinfra.com/'], 
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials:true  
}; 
app.use(cors(corsoptions)); 
app.options('*', cors(corsoptions));

app.use(express.json());
app.use('/static/sidebar', express.static(path.join(__dirname, 'public/sidebar')));
app.use('/custom', express.static(path.join(__dirname, 'public/custom')));
app.use('/comingsoon', express.static(path.join(__dirname, 'public/comingsoon')));
app.use('/static/adminmodules', express.static(path.join(__dirname, 'public/adminmodules')));
app.use('/public/texteditor', express.static(path.join(__dirname, 'public/texteditor')));
app.use('/public/creatorclub', express.static(path.join(__dirname, 'public/creatorclub')));


app.use("/api/auth", authRoute);
// app.use("/api/data", authRoute);
app.use("/api/customer", customerRoute);
app.use("/api/profile", profileRoute);
app.use("/api/product", productRoute);
app.use("/api/pri",privilegeRoute);
app.use("/api/upload", csvRoute);    
app.use("/api/customerauth", customerloginRoute);
app.use("/api/form",formmoduleRoute);
app.use("/api/crud", crudRoute);
app.use("/api/dns", domainRoute);
app.use("/api/custom", customRoute);
app.use("/api/package", packageRoute);
app.use("/api/knowledgebase", knowledgebaseRoute);
app.use("/api/comingsoon", comingsoonRoute);
app.use("/api/creatorclub", creatorclubRoute);




// otp
app.use(errorMiddleware);
app.use(errorMiddleware1);
connectDB().then( ()=>{
    app.listen(port, () =>{
        console.log(`server is running at port no ${port}`);
    });
});

