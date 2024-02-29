
exports.signout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ code: 200, message: `Signed out  successfully!` });
  } catch (e) {
    res.status(401).json({ code: 401, message: `Something went wrong!` });
    console.error(e);
  }
};
