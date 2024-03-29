const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

// User registration
exports.registerUser = async (req, res) => {
    const { username, password, email, fullname } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username Telah digunakan' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = new UserModel({
            fullname,
            email,
            username,
            password: hashedPassword,
        });
        await newUser.save();

        res.status(201).json({ message: 'Registrasi Berhasil' });
    } catch (error) {
        res.status(500).json({ message: 'Registrasi Gagal' });
    }
};

// User login
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User Tidak Ditemukan' });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Password Salah' });
        }

        // Generate JWT token
        const token = jwt.sign({ Id: user._id, username: user.username }, "Hakuna Matata", {
            expiresIn: '3h', // Set token expiration time
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
};

// Token verification
exports.checkTokenValidity = (req, res) => {
    res.json({ valid: true });
};
