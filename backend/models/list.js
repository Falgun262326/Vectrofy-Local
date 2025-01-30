import mongoose from "mongoose";

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

export const List = mongoose.model("List", listSchema);
// export default List;
