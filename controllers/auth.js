const {generate, verify} = require('../utils/generateToken');
const User = require('../models/User');
const ErrorResponse = require('../utils/ErrorResponse');

// URL : /auth/login
exports.login = async (req, res) => {

    const {username, password} = req.body;

    if(!username || !password)
        throw new ErrorResponse(401, 'Please Enter username or password');
    // Get the user information
    const user = await User.findOne({username});
    // No user with that username
    if(!user) {
        throw new ErrorResponse(401, 'Invalid username');
    }
    // Check the password 
    const isMatch = await user.matchPassword(password)
    // console.log(password);
    // If password incorrect 
    if(!isMatch) throw new ErrorResponse(401, 'Wrong username or password');
    // Check if the account is active
    if(!user.isActive) {
        throw new ErrorResponse(401, 'Account is not active');
    }

    res.status(200).json({
        success: true,
        token: generate({user_id: user._id})
    });

}

// URL : /auth/logout
exports.logout = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'No action needed, delete the token from your browser'
    });
}