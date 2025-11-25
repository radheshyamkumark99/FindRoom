const express = require("express");
const router = express.Router({mergeParams: true});
const wrapasync = require("../utils/wrapasync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listining.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");



const reviewController = require("../controllers/reviews.js");



//REVIEWS
//POST ROUTE
router.post("/", isLoggedIn, validateReview, wrapasync(reviewController.createReview));


//DELETE REVIEW ROUTE
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapasync(reviewController.destroyReview));

module.exports = router;