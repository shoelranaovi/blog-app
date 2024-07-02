import User from "../model/userModel.js";
import bcryptjs from "bcryptjs";

export async function updateuser(req, res) {
  console.log(req.body);

  if (req.user._id !== req.params.userId) {
    return res.status(400).json({ massage: "error3" });
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return res.status(400).json({ massage: "error4" });
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return res.status(400).json({ massage: "error1" });
    }
    if (req.body.username.includes(" ")) {
      return res.status(400).json({ massage: "error2" });
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return res.status(400).json({ massage: "error3" });
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return res.status(400).json({ massage: "error8" });
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.log(error);
  }
}
