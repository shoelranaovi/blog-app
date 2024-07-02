export async function signout(req, res) {
  try {
    res.clearCookie("token");

    res.status(200).json({
      message: "SIGN out COMPLETE",
      data: [],
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json(error);
  }
}
