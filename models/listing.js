const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema= new Schema({
   title: {
    type: String,
    required:true,
   },
   description: String,
   image:{ 
    type: String,
    default: "https://unsplash.com/photos/a-model-of-a-house-on-top-of-a-mountain-o8m4r6iqlSc",
    set: (v)=> v===""? "https://unsplash.com/photos/a-model-of-a-house-on-top-of-a-mountain-o8m4r6iqlSc" :v ,
   },
   price: Number,
   location: String,
   country: String,
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;
