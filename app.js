const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js");
const Review=require("./models/review.js");


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
app.get("/listings",  wrapAsync(async (req,res)=>{
 const allListings= await Listing.find({});
//  res.render("/listings/index.ejs", {allListings});
res.render("listings/index.ejs", {allListings});
})
);

// NEW ROUTE 
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
 });

// SHOW ROUTE
// app.get("/listings/:id", async (req,res)=>{
//    let { id }=req.params;
//     const listing=await Listing.findById(id);
//     res.render("listings/show.ejs",{listing});
// });

app.get("/listings/:id", wrapAsync(async (req, res) => {
    try{
    let { id } = req.params;
    const listing = await Listing.findById(id);
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
app.post("/listings",validateListing, wrapAsync( async (req,res,next)=>{
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
app.get("/listings/:id/edit",  wrapAsync(async(req,res)=>{
    let { id }=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

// UPDATE ROUTE
app.put("/listings/:id",validateListing,wrapAsync(async(req,res)=>{
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
app.delete("/listings/:id", wrapAsync(async(req,res)=>{
    let { id }=req.params;
   let deletedlisting=await Listing.findByIdAndDelete(id);
   console.log(deletedlisting);
   res.redirect("/listings")
}));

app.all("*",(req,res,next)=>{
   next(new ExpressError(404,"Page Not Found")) ;
});

// REVIEWS
// POST ROUTE
// app.post("/listings/:id/reviews", async(req,res)=>{
//   let listing = await Listing.findById(req.params.id);
//   let newReview = new Review(req.body.review);

//   listing.reviews.push(newReview);
//   await newReview.save();
//   await listing.save();

//   console.log("new review saved");
//   res.redirect("new review saved");
// });

app.post("/listings/:id/reviews", async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
  
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
  
    console.log("new review saved");
      res.redirect(`/listings/${listing._id}`);
  });



app.use( (err,req,res,next)=>{
    let { statuscode=500, message="Something went wrong"} = err;
    res.status(statuscode).render("error.ejs",{message});
    // res.status(statuscode).send(message);

// res.send("Something went wrong");
});

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});