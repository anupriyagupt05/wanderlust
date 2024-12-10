const express=require("express");
const router=express.Router({mergeParams: true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const { isloggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController=require("../controllers/review.js");

const validateReview = (req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    // console.log(result);
    if(error) {
        let errMsg = error.details.map( (el)=>el.message).join(",");
        throw new ExpressError(400,error);
    }
    else{
        next();
    }
}


// POST REVIEW ROUTE
router.post("/", isloggedIn ,validateReview, wrapAsync(reviewController.createReview));

//  DELETE REVIEW POST ROUTE
router.delete("/:reviewId",isloggedIn,isReviewAuthor, reviewController.destroyReview);


module.exports=router;
