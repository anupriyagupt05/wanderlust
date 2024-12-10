const express=require("express");
const app=express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
// const cookieParser=require("cookie-parser");
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path");
const { request } = require("http");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


 const sessionOptions={
    secret:"mysupersecretstring",
     resave: false, 
     saveUninitialized: true,
 };

app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
  res.locals.successMsg =req.flash("success");
  res.locals.errorMsg =req.flash("error");
  next();
});

app.get("/register", (req,res)=>{
 let {name="anonymous"} = req.query;
req.session.name=name;
// console.log(req.session.name);
//  res.send(name);
if(name==="anonymous"){
  req.flash("error","user not registered");
}else{
  req.flash("success","user registered succesfully");
}
res.redirect("/hello");
});


app.get("/hello",(req,res)=>{
  // res.locals.successMsg =req.flash("success");
  // res.locals.errorMsg =req.flash("error");
  res.render("page.ejs", {name: req.session.name});
  // res.send(`hello ${req.session.name}`);
});



// app.get("/reqcount",(req,res)=>{
//   if(req.session.count){
//     req.session.count++;
//   }
//   else{
//     req.session.count= 1;
//   }
//  res.send(`you  sent a req ${req.session.count} times`);
// });

// app.get("/test",(req,res)=>{
//    res.send("test successful");
// });


// app.use(cookieParser());

// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie", (req,res)=>{
//   res.cookie("made-in", "India", {signed: true});
//   res.send("signed cookie sent");
// });

// app.get("/verify", (req,res)=>{
//   console.log(req.signedCookies);
//   res.send("verifies");
// });

// app.get("/getcookies",(req,res)=>{
//   res.cookie("greet","hello");
//   res.send("sent you some cookies!");
// });

// app.get("/greet",(req,res)=>{
//   let{name="anonymous"}=req.cookies;
//   res.send(`Hii , ${name}`);
// });


// app.get("/",(req,res)=>{
//   console.dir(req.cookies);
//   res.send("Hi ,i am root!");
// });


// app.use("/users", users);
// app.use("/posts", posts);

// // INDEX ROUTE
// // app.get("/users", (req,res)=>{
// //   res.send("GET for users");
// // });

// // // SHOW USERS
// // app.get("/users/:id", (req,res)=>{
// //   res.send("GET for user id");
// // });

// // // POST USER
// // app.post("/users", (req,res)=>{
// //   res.send("post for users");
// // });

// // // DELETE USERS
// // app.delete("/users/:id", (req,res)=>{
// //   res.send("DELETE for userId");
// // });


// // // POST 
// // // INDEX
// // app.get("/posts", (req,res)=>{
// //   res.send("GET for posts");
// // });

// // // SHOW
// // app.get("/posts/:id", (req,res)=>{
// //   res.send("GET for POST id");
// // });

// // // POST
// // app.post("/posts", (req,res)=>{
// //   res.send("POST for POSTS");
// // });

// // // DELETE USERS
// // app.delete("/posts/:id", (req,res) =>{
// //    res.send("DELETE for post id");
// // });

app.listen(3000,()=>{
    console.log("server is listening to 3000");
});