const express=require("express");
const app=express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");

app.get("/",(req,res)=>{
  res.send("Hi ,i am root!");
});


app.use("/users", users);
app.use("/posts", posts);

// INDEX ROUTE
// app.get("/users", (req,res)=>{
//   res.send("GET for users");
// });

// // SHOW USERS
// app.get("/users/:id", (req,res)=>{
//   res.send("GET for user id");
// });

// // POST USER
// app.post("/users", (req,res)=>{
//   res.send("post for users");
// });

// // DELETE USERS
// app.delete("/users/:id", (req,res)=>{
//   res.send("DELETE for userId");
// });


// // POST 
// // INDEX
// app.get("/posts", (req,res)=>{
//   res.send("GET for posts");
// });

// // SHOW
// app.get("/posts/:id", (req,res)=>{
//   res.send("GET for POST id");
// });

// // POST
// app.post("/posts", (req,res)=>{
//   res.send("POST for POSTS");
// });

// // DELETE USERS
// app.delete("/posts/:id", (req,res) =>{
//    res.send("DELETE for post id");
// });

app.listen(3000,()=>{
    console.log("server is listening to 3000");
});