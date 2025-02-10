const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Function to generate JWT token
const generateAccessToken = (user) => {
    return jwt.sign(
        { user: { id: user._id, email: user.email } },
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    );
};

// Login Function
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Received email:", email);
        
        const user = await UserModel.findOne({ email });
        console.log("Found User:", user);

        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("Password Match:", isPasswordValid);

        if (!isPasswordValid) {
            return res.status(400).json({ msg: 'Wrong password' });
        }

        const token = generateAccessToken(user);
        res.json({ token, user: { id: user._id, email: user.email } });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};



module.exports = { login };
