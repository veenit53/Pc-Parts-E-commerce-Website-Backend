const mongoose = require("mongoose")

const buildSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true   // one saved build per user (overwrite on save)
    },
    // Stores full product objects keyed by category:
    // { CPU: {...}, GPU: {...}, RAM: {...}, ... }
    components: {
      type: Object,
      default: {}
    }
  },
  { timestamps: true, strict: false }
)

module.exports = mongoose.model("Build", buildSchema)