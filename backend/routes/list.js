const router = require("express").Router();
const List = require("../models/list");
const User = require("../models/user");

router.post("/upload-image", async (req, res) => {
  const { base64, rangeVal, id } = req.body;
  const existingUser = await User.findById(id);

  if (!base64) {
    return res
      .status(400)
      .json({ status: "error", message: "No base64 data provided" });
  }

  if (existingUser) {
    try {
      const list = new List({ image: base64, rangeVal, user: existingUser });
      await list.save().then(() => res.status(200).json({ list }));
      existingUser.uploadedImages.push(list);
      existingUser.save();
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ status: "error", message: error.message });
    }
  }
});

router.get("/get-image", async (req, res) => {
  const { id } = req.query;
  try {
    const existingUser = await User.findById(id).populate("uploadedImages");
    if (!existingUser) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    const uploadedImages = existingUser.uploadedImages;
    uploadedImages.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    res.status(200).json({ images: uploadedImages });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ status: "error", data: error.message });
  }
});

router.delete("/delete-image/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const listItem = await List.findById(id);
    if (!listItem) {
      return res
        .status(404)
        .json({ status: "error", message: "Image not found" });
    }

    // Remove the image from the User's uploadedImages array
    await User.updateOne(
      { _id: listItem.user },
      { $pull: { uploadedImages: id } }
    );

    // Delete the image document from the List collection
    await List.findByIdAndDelete(id);

    res
      .status(200)
      .json({ status: "success", message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while deleting the image",
    });
  }
});

router.get("/get-edit-image/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const listItem = await List.findById(id);
    if (!listItem) {
      return res
        .status(404)
        .json({ status: "error", message: "Image not found" });
    }

    const imageData = listItem.image;
    const rangeVal = listItem.rangeVal;

    res.status(200).json({ editImage: imageData, rangeVal });
  } catch (error) {
    console.error("Error getting image:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while deleting the image",
    });
  }
});

router.put("/update-image-range/:id", async (req, res) => {
  const { id } = req.params;
  const { rangeVal } = req.body;
  try {
    const list = await List.findByIdAndUpdate(id, { rangeVal }, { new: true });
    if (list) {
      res.status(200).json({ message: "Range value updated", list });
    } else {
      res.status(404).json({ message: "Document not found" });
    }
  } catch (error) {
    console.error("Error updating range:", error);
    res.status(500).json({ error: "Failed to update range" });
  }
});

module.exports = router;
