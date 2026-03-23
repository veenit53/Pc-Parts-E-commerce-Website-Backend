const express = require("express")
const router = express.Router()

const authMiddleware = require("../../middlewares/auth.middleware")
const { saveBuild, getMyBuild, deleteBuild } = require("../../controllers/user/build.controller")

// Save (or overwrite) the user's PC build
router.post("/builds/save", authMiddleware, saveBuild)

// Get the user's saved build
router.get("/builds/my-build", authMiddleware, getMyBuild)

// Delete the user's saved build
router.delete("/builds/my-build", authMiddleware, deleteBuild)

module.exports = router