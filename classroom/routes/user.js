const express=require("express");
const router=express.Router();


// INDEX ROUTE
router.get("/", (req,res)=>{
    res.send("GET for users");
  });
  
  // SHOW USERS
  router.get("/:id", (req,res)=>{
    res.send("GET for user id");
  });
  
  // POST USER
  router.post("/", (req,res)=>{
    res.send("post for users");
  });
  
  // DELETE USERS
  router.delete("/:id", (req,res)=>{
    res.send("DELETE for userId");
  });


  module.exports = router;