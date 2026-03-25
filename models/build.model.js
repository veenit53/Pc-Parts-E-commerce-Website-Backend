const mongoose = require("mongoose")

const buildSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    components: {
      type: Object,
      default: {}
    }
  },
  { timestamps: true, strict: false }
)

module.exports = mongoose.model("Build", buildSchema)