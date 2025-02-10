const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel'); // Ensure the correct model path
require('dotenv').config();

const secretKey = process.env.JWT_SECRET; // Use your secret key from .env

// Login or Register route
router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter password').not().isEmpty(),
  ],
  async (req, res) => {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ err: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user exists
      let user = await UserModel.findOne({ email });

      if (!user) {
        // If user not found, create a new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        user = new UserModel({
          email,
          password: hashedPassword,
        });

        await user.save(); // Save the user to the database

        return res.status(201).json({ msg: 'User registered successfully' });
      }

      // Check if the password is correct
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        return res.status(400).json({ msg: 'Wrong password' });
      }

      // Create JWT payload
      const payload = { user: { id: user.id } };

      // Generate JWT token
      jwt.sign(
        payload,
        secretKey,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ msg: 'Server error' });
          }
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
