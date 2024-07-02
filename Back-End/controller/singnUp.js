import bcrypt from "bcryptjs";
import User from "../model/userModel.js";

async function signUp(req, res) {
  const { username, password, email } = req.body;
  try {
    const alread = await User.findOne({ email });

    if (alread) {
      return res.status(400).json({
        message: "user already added",
        error: true,
        success: false,
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashpass = await bcrypt.hashSync(password, salt);

    const payload = {
      ...req.body,
      password: hashpass,
    };

    const newuser = new User(payload);
    const savedata = await newuser.save();
    res.status(200).json({
      data: savedata,
      message: "User created successfully",
    });
  } catch (error) {
    res.json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}
export default signUp;
