const jwt = require("jsonwebtoken");
const User = require("../../model/userSchema");

exports.isAuth = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decode = jwt.decode(token, process.env.JWT_SECRET);

      const user = await User.findById(decode.userId);
      if (!user) {
        return res.json({
          success: false,
          message: "unathorized access token maybe invalid",
        });
      }
      req.user = user;
      next();
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res.json({ success: false, message: "unauthorized access!" });
      }
      if (error.name === "TokenExpiredError") {
        return res.json({
          success: false,
          message: "session expired, try sign in!",
        });
      }
      res.json({ success: false, message: "internal server error" });
    }
  } else {
    res.json({
      success: false,
      message: "unathorized access due to token not in the header",
    });
  }
};
