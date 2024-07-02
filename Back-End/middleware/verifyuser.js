import jwt from "jsonwebtoken";
export async function verifyToken(req, res, next) {
  try {
    const token = req.cookies?.token;
    console.log(token);

    if (!token) {
      throw new Error("user Not yet found");
    }
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}
