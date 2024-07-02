import User from "../model/userModel.js";

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
