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
    default: "https://unsplash.com/photos/brown-wooden-house-with-green-grass-field-Bkp3gLygyeA",
    set: (v)=> v===""? "https://unsplash.com/photos/brown-wooden-house-with-green-grass-field-Bkp3gLygyeA" :v ,
   },
   price: Number,
   location: String,
   country: String,
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;
