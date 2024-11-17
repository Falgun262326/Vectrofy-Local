const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    rangeVal: {
      type: Number,
    },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("List", listSchema);
