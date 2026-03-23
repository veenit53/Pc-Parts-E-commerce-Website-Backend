const Build = require("../../models/build.model")

// POST /builds/save
const saveBuild = async (req, res) => {
  try {
    const userId = req.user._id
    const { components } = req.body

    if (!components || typeof components !== "object") {
      return res.status(400).json({ message: "components object is required" })
    }

    // Use replaceOne with upsert to avoid any casting issues with findOneAndUpdate
    await Build.replaceOne(
      { user: userId },
      { user: userId, components, updatedAt: new Date() },
      { upsert: true }
    )

    return res.status(200).json({ message: "Build saved successfully" })
  } catch (err) {
    console.error("saveBuild error:", err)
    return res.status(500).json({ message: "Internal server error" })
  }
}

// GET /builds/my-build
const getMyBuild = async (req, res) => {
  try {
    const userId = req.user._id

    const build = await Build.findOne({ user: userId }).lean()

    if (!build) {
      // Return empty build instead of 404 so frontend doesn't log errors on first load
      return res.status(200).json({ build: null })
    }

    return res.status(200).json({ build })
  } catch (err) {
    console.error("getMyBuild error:", err)
    return res.status(500).json({ message: "Internal server error" })
  }
}

// DELETE /builds/my-build
const deleteBuild = async (req, res) => {
  try {
    const userId = req.user._id
    await Build.findOneAndDelete({ user: userId })
    return res.status(200).json({ message: "Build deleted" })
  } catch (err) {
    console.error("deleteBuild error:", err)
    return res.status(500).json({ message: "Internal server error" })
  }
}

module.exports = { saveBuild, getMyBuild, deleteBuild }