const jwt = require("jsonwebtoken");
const Token = require("../models/Token");

module.exports = async (req, res, next) => {
  const auth = req.headers?.authorization || null; // Bearer  ...accessToken
  const [tokenPrefix, tokenKey] = auth ? auth.split(" ") : [];

  if (tokenKey) {
    if (tokenPrefix == "Token") {
      const tokenData = await Token.findOne({ token: tokenKey }).populate(
        "userId",
      );
      req.user = tokenData ? tokenData.userId : undefined;
    } else if (tokenPrefix === "Bearer") {
      jwt.verify(
        tokenKey,
        process.env.ACCESS_KEY,
        (err, userData) => (req.user = userData),
      );
    }
  }

  next();
};