import User from "../model/userModel.js";

async function getalluser(req, res) {
  try {
    const users = await User.find();
    res.status(200).json({
      users,
    });
  } catch (error) {
    console.log();
  }
}

export default getalluser;
