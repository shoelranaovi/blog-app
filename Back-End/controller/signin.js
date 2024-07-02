import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function signin(req, res) {
  const { email, password } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ error: "password is required" });
    }

    const finduser = await User.findOne({ email });

    if (!finduser) {
      return res.status(400).json({ error: "check your email address" });
    }
    const comparepass = bcrypt.compareSync(password, finduser.password);
    if (!comparepass) {
      return res.status(400).json({ error: "check your password" });
    } else {
      const tokendata = {
        _id: finduser._id,
        email: finduser.email,
        isAdmin: finduser.isAdmin,
      };
      const token = await jwt.sign(tokendata, process.env.SECRET_KEY, {
        expiresIn: "8h",
      });
      console.log(token);
      const tokenoption = {
        httpOnly: true,
        securce: true,
      };

      res.status(200).cookie("token", token, tokenoption).json({
        message: "login successfully",
        data: finduser,
        success: true,
        error: false,
      });
    }
    console.log(comparepass);
  } catch (error) {
    res.json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}

export default signin;
