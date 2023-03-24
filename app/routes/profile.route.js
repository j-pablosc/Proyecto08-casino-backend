const express = require("express");
const multer = require("multer");
const { authValidation } = require("../util/middlewares/authValidation");
const {
    updatePhotoProfile,
    getProfile,
} = require("../controllers/profile.controller");
const router = express.Router();
const upload = multer();



router.post(
    "/updatePhotoProfile",
    upload.single("photo"),
    authValidation,
    updatePhotoProfile
    
);
router.get("/getProfile",  authValidation, getProfile);

module.exports = router;
