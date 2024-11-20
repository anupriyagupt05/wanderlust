const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");

const mongo_url="mongodb://127.0.0.1:27017/wanderlust";

main()
.then( ()=>{
   console.log("connected to DB");
})
.catch( (err)=>{
    console.log(err);
});
 
async function main() {
    await mongoose.connect(mongo_url);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    res.send("Hi , i am root");
});

// app.get("/testListing",async (req,res)=>{
//     let sampleListing=new Listing({
//         title:"My new villa", 
//         description: "By the beach",
//         price:1200,
//         location: "Calangute, Goa",
//         country: "India",
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });


// INDEX ROUTE
app.get("/listings",async (req,res)=>{
 const allListings= await Listing.find({});
//  res.render("/listings/index.ejs", {allListings});
res.render("listings/index.ejs", {allListings});
});

// NEW ROUTE 
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
 });

// SHOW ROUTE
app.get("/listings/:id", async (req,res)=>{
   let { id }=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

// CREATE ROUTE
app.post("/listings", wrapAsync( async (req,res,next)=>{
  const newListing=new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
 })
);

// EDIT ROUTE
app.get("/listings/:id/edit", async(req,res)=>{
    let { id }=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

// UPDATE ROUTE
app.put("/listings/:id", async(req,res)=>{
    let { id }=req.params;
    await Listing.findByIdAndUpdate(id,{ ...req.body.listing});
    res.redirect(`/listings/${id}`);
});

// DELETE ROUTE
app.delete("/listings/:id", async(req,res)=>{
    let { id }=req.params;
   let deletedlisting=await Listing.findByIdAndDelete(id);
   console.log(deletedlisting);
   res.redirect("/listings")
});


app.use( (err,req,res,next)=>{
res.send("Something went wrong");
});

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});