const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isloggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });



//INDEX ROUTE & CREATE ROUTE
router.route("/")
.get(wrapAsync(listingController.index))
.post( isloggedIn,upload.single('listing[image]'),validateListing, wrapAsync(listingController.createListings));





// NEW ROUTE 
router.get("/new",isloggedIn,listingController.renderNewForm);


// EDIT ROUTE
router.get("/:id/edit", isloggedIn,isOwner, wrapAsync(listingController.renderEditForm));



//SHOW ROUTE & UPDATE ROUTE & DELETE ROUTE
router.route("/:id")
.get(wrapAsync(listingController.showlisting))
.put(isloggedIn, isOwner, upload.single('listing[image]'), validateListing,wrapAsync(listingController.updateListing))
.delete(isloggedIn,isOwner,wrapAsync(listingController.deleteListing));




module.exports = router;