const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema} = require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");



const validateListing = (req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    // console.log(result);
    if(error) {
        let errMsg = error.details.map( (el)=>el.message).join(",");
        throw new ExpressError(400,error);
    }
    else{
        next();
    }
}

// INDEX ROUTE
router.get("/",  wrapAsync(async (req,res)=>{
 const allListings= await Listing.find({});
//  res.render("/listings/index.ejs", {allListings});
res.render("listings/index.ejs", {allListings});
})
);

// NEW ROUTE 
router.get("/new",(req,res)=>{
    res.render("listings/new.ejs")
 });

// SHOW ROUTE
// app.get("/listings/:id", async (req,res)=>{
//    let { id }=req.params;
//     const listing=await Listing.findById(id);
//     res.render("listings/show.ejs",{listing});
// });

router.get("/:id", wrapAsync(async (req, res) => {
    try{
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if (!listing) {
        return res.status(404).send("Listing not found");
        }
    res.render("listings/show.ejs", { listing });
    }
    catch(err){
        res.status(404).send("listing not found");
    }
}));

// CREATE ROUTE
router.post("/",validateListing, wrapAsync( async (req,res,next)=>{
    // let result=listingSchema.validate(req.body);
    // console.log(result);
    // if(result.error) {
    //     throw new ExpressError(400,result.error)
    // }
    // if(!req.body.listing){
    //    throw new ExpressError(400,"Send valid data for listing"); 
    // }
  const newListing=new Listing(req.body.listing);
//   if(!newListing.title){
//     throw new ExpressError(400,"title is missing"); 
//   }
//   if(!newListing.description){
//     throw new ExpressError(400,"description is missing"); 
//   }
//   if(!newListing.location){
//     throw new ExpressError(400,"location is missing"); 
//   }

  await newListing.save();
  res.redirect("/listings");
 })
);

// EDIT ROUTE
router.get("/:id/edit",  wrapAsync(async(req,res)=>{
    let { id }=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

// UPDATE ROUTE
router.put("/:id",validateListing,wrapAsync(async(req,res)=>{
    if (!listing) {
        return res.status(404).send("Listing not found");
        }
    let { id }=req.params;
    await Listing.findByIdAndUpdate(id,{ ...req.body.listing});
    res.redirect(`/listings/${id}`);
}));

// app.delete("/listings/:id",  wrapAsync(async (req, res) => {
//     try {
//         let { id } = req.params;
//         let deletedlisting = await Listing.findByIdAndDelete(id);
//         if(!deletedlisting){
//             console.log("lisitng is not available");
//         }
//         console.log(deletedlisting);
//         res.redirect("/listings")
//     } catch (err) {
//         res.status(404).send("listing not found");
//     }
// }));

// DELETE ROUTE
router.delete("/:id", wrapAsync(async(req,res)=>{
    let { id }=req.params;
   let deletedlisting=await Listing.findByIdAndDelete(id);
   console.log(deletedlisting);
   res.redirect("/listings")
}));




module.exports = router;