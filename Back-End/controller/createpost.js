import Post from "../model/postModel.js";

export async function createpost(req, res) {
  console.log(req.user.isAdmin);
  if (!req.user.isAdmin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!req.body.title || !req.body.content) {
    return res.status(400).json({ message: "Title and content are required" });
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-p-]/g, "-");
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user._id,
  });
  try {
    const savePost = await newPost.save();
    res.status(201).json(savePost);
  } catch (error) {
    res.status(400).json(error.message);
  }
}
