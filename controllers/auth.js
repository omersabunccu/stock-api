const { ErrorResponse } = require("../middlewares/errorHandler");
const User = require("../models/User");
const Token = require("../models/Token");
const jwt = require("jsonwebtoken");
const { pbkdf2Sync } = require("crypto");


// URL  POST /api/auth/login
exports.login = async (req, res) => {
  const { username, email, password } = req.body;

  if ((!username || !email) && !password)
    throw new ErrorResponse(401, "Please Enter username/email and Password");
  // Find the user
  const user = await User.findOne({ $or: [{ username }, { email }] });
  if (!user) throw new ErrorResponse(401, "Wrong username/email or password");
  // Validate password
  const isMatch = await user.matchPassword(password);
  if (!isMatch)
    throw new ErrorResponse(401, "Wrong username/email or password");
  //  Check if the user is active
  if (!user.isActive) throw new ErrorResponse(401, "Account is inactive");
  // Token
  let tokenData = await Token.findOne({ userId: user._id });

  // Token  ...token
  if (!tokenData)
    tokenData = await Token.create({
      userId: user._id,
      token: pbkdf2Sync(
        user._id + Date.now(),
        process.env.SECRET_KEY,
        1000,
        32,
        "sha512",
      ).toString("hex"),
    });

  // JWT - Bearer  ...accessToken
  const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_KEY, {
    expiresIn: "30min",
  });
  const refreshToken = jwt.sign({ _id: user._id , password: user.password}, process.env.REFRESH_KEY, {
    expiresIn: "3d",
  });

  res.status(200).json({
    success: true,
    key: tokenData.token, //React Project
    bearer: {
      accessToken,
      refreshToken,
    },
    user,
  });
};
// URL  POST/GET  /api/auth/login
exports.logout = async (req, res) => {

  const auth = req.headers?.authorization || null; // Bearer  ...accessToken
  const [tokenPrefix, tokenKey] = auth ? auth.split(" ") : null;

  console.log(auth)
  let message = null;
  let result = null;
  if (tokenKey) {
    if (tokenPrefix == "Token") {
      result = await Token.deleteOne({ token: tokenKey });
      message = "Token deleted. Logout successfullt ";
    } else if (tokenPrefix === "Bearer") {
      message = "No need for logout. You must delete JWT tokens";
    }
  } else {
    throw new ErrorResponse(401, "No Token");
  }

  res.send({
    success: true,
    message,
    result,
  });
};

// URL POST     /api/auth/refesh
exports.refresh = async(req, res) => {

    const refrehsToken = req.body?.bearer?.refreshToken
    if(!refrehsToken)
        throw new ErrorResponse(401, 'Please entere refreshToken')
    jwt.verify(refrehsToken, process.env.REFRESH_KEY, async function(err, userData){
        if(err)
            throw new ErrorResponse(401, err.message)
        const {_id, password} = userData;
        if(!_id|| !password)
            throw new ErrorResponse(401, 'Please eneter id or password')
        // Check the id 
        const user = await User.findOne({_id})
        if(!user)
            throw new ErrorResponse(401, 'Wrong id or password')
        if(user.password !=password)
             throw new ErrorResponse(401, 'Wrong id or password')
        if(!user.isActive)
             throw new ErrorResponse(401, 'This account is not active')
            // JWT
             const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_KEY, {expiresIn:'3d'})
             res.send({
                success: true,
                accessToken
             })
    })
};