import Post from "../model/postModel.js";

export const deletepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user._id !== req.params.userId) {
    return res
      .status(401)
      .json({ message: "you are not athorize to delete this post" });
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("The post has been deleted");
  } catch (error) {
    res.status(400).json({ message: error.mmessage });
  }
};
