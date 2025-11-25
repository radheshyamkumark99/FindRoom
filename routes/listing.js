const express = require("express");
const router = express.Router();
const Listing = require("../models/listining.js");
const wrapasync = require("../utils/wrapasync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// INDEX ROUTE && CREATE ROUTE MERGE
router
  .route("/")
  .get(wrapasync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapasync(listingController.createListing)
  );

//NEW ROUTE
router.get("/new", isLoggedIn, listingController.renderNewForm);

//SHOW ROUTE && UPDATE ROUTE && DELETE ROUTE MERGE
router
  .route("/:id")
  .get(wrapasync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapasync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapasync(listingController.destroyListing));

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapasync(listingController.renderEditForm)
);

module.exports = router;
