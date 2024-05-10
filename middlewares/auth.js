const User = require("../models/User");
const { verify } = require("../utils/generateToken");
const ErrorResponse = require("../utils/ErrorResponse");

// Authentication
exports.auth = async (req, res, next) => {
  const auth = req.headers?.authorization || null;
  const accessToken = auth ? auth.split(" ")[1] : null;
//   console.log(accessToken);
  try {
    const userData = await verify(accessToken);
    // console.log(userData);
    // console.log("User Data: ", accessToken, userData);
    const user = await User.findById(userData.user_id);
    // console.log(user);
    if (!user) {
      return next(new ErrorResponse(404, "User not found"));
    }
    //   attach the user information to req
    req.user = user;
    // console.log(req.user);
    //    Add owner_Id for all req.body
    req.body.owner_id = req.user?._id;
  } catch (error) {
    return next(new ErrorResponse(500, "Authentication failed"));
  }
  return next();
};

exports.isLogin = (req, res, next) => {
  if (req.user) {
    // console.log(req.user);
    next();
  } else {
    // console.log("Failed to login: ", req.user);
    throw new ErrorResponse(403, "Login required");
  }
};

exports.isAdmin = (req, res, next) => {
  
  if (req.user.isAdmin) {
    next();
  } else {
    // console.log("Failed to Admin Login:", req.user);
    throw new ErrorResponse(403, "Admin login required");
  }
};


// exports.isOwner = (req, res, next) => {
//   if (req.user._id.toString() === req.body.owner_id) {
//     next();
//   } else {
//     throw new ErrorResponse(403, "Owner login required");
//   }
// };

// exports.isStaffOrAdmin = (req, res, next) => {
//   if (req.user.isAdmin || req.user.isStaff) {
//     return next();
//   } else {
//     throw new ErrorResponse(403, "Staff or Admin login required");
//   }
// };
