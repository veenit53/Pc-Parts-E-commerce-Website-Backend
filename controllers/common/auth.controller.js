const User = require("../../models/user.model");
const jwt = require("jsonwebtoken");


/*
REGISTER USER
*/
exports.registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // Password will be hashed automatically by the model
    const user = await User.create({
      name,
      email,
      password
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRETKEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message
    });

  }
};


/*
LOGIN USER
*/
exports.loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // use model method
    const isMatch = await user.isPasswordCorrect(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { userId: user._id },   // important fix
      process.env.ACCESS_TOKEN_SECRETKEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message
    });

  }
};




/*
GET USER PROFILE
*/
exports.getProfile = async (req, res) => {

  try {

    // user already attached by authMiddleware
    res.status(200).json({
      success: true,
      user: req.user
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Unable to fetch profile"
    });

  }

};