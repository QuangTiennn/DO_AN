const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "did not receive token!",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.decode = decode;
    return next();
  } catch (error) {
    console.log("error", error);
    return res.status(403).json({
      error,
      message: "token is not valid!",
    });
  }
};
module.exports = verifyToken;