const express = require("express");
const { requireSignin } = require("../common-middleware");
const uploader = require("../common-middleware/uploader");
const { profiles, myProfile, UpdateProfile, userProfile } = require("../controller/profiles");
const router = express.Router();

router.post("/create-profile", requireSignin, uploader.single("avatar"), profiles);

router.get("/my-profile", requireSignin, myProfile);

router.put("/update-profile", requireSignin, uploader.single("avatar"), UpdateProfile);

router.get("/profile-user/:username", userProfile);

module.exports = router;