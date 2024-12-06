const express=require("express");
const router=express.Router();


// POST 
// INDEX
router.get("/", (req,res)=>{
    res.send("GET for posts");
  });
  
  // SHOW
  router.get("/:id", (req,res)=>{
    res.send("GET for POST id");
  });
  
  // POST
router.post("/", (req,res)=>{
    res.send("POST for POSTS");
  });
  
  // DELETE USERS
  router.delete("/:id", (req,res) =>{
     res.send("DELETE for post id");
  });

  module.exports = router;