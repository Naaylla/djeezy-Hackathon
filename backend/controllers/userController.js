const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { access } = require("fs");

// @desc Register a user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { firstname, lastname, email, password, nationalCardNumber, birthDate } = req.body;
    if (!firstname || !lastname || !email || !password || !nationalCardNumber || !birthDate) {
        res.status(400);
        throw new Error("Please fill in all fields");
        return;
    }
    const userAvailable = await User.findOne({ nationalCardNumber });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already exists");
        return;
    }

    const userAvailable2 = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already exists");
        return;
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed Pass", password);

    const user = await User.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        nationalCardNumber,
        birthDate,
    });

    console.log("User created", user);
    if (user)
    {
        res.status(201).json({_id: user.id, firstname: user.firstname, email: user.email});
    } else
    {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc Login a user
// @route POST /api/users/login  <-- CHANGED TO POST
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please fill in all fields");
        return;
    }

    const user = await User.findOne({ email })

    if (user && ( await bcrypt.compare(password, user.password) )) 
    {
        const accessToken = jwt.sign({ 
            email: user.email, 
            id: user._id }, 
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1d" });
        res.status(200).json({ accessToken })
    } else
    {
        res.status(401);
        throw new Error("Invalid email or password");
    }
    
});

// @desc Get current user info
// @route GET /api/users/current
// @access Private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
