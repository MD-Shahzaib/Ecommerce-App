const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const verifyToken = require('../middlewares/verifyToken');

// GET-ALL-USERS = (GET="http://localhost:5000/api/users")=(auth Required).
router.get('/', verifyToken, async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE-NEW-USER = (POST="http://localhost:5000/api/users")=(no-auth Required).
router.post('/', async (req, res) => {
    const data = req.body
    const user = new Users(data);
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// LOGIN-USER = (POST="http://localhost:5000/api/users/login")=(auth Required).
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate the password
        const isPwdCorrect = user.comparePassword(password);
        if (!isPwdCorrect) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // User is authenticated generate token.
        const token = await user.generateToken();
        return res.status(201).json({ message: 'Login successfull', token: token });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// UPDATE-USER = (PUT="http://localhost:5000/api/users/userid")=(auth Required).
router.put('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const updatedUser = await Users.findByIdAndUpdate(id, data, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE-USER = (DELETE="http://localhost:5000/api/users/userid")=(auth Required).
router.delete('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await Users.findByIdAndDelete(id);
        res.json(deletedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET-LOGGEDIN-USER-DETAILS = (GET="http://localhost:5000/api/users/profile")=(auth Required).
router.get('/profile', verifyToken, async (req, res) => {
    try {
        const { _id } = req.decoded
        const userProfile = await Users.findById(_id).select("-password");
        res.send({ message: "Success", data: userProfile });
    } catch (error) {
        res.send({ message: "Error", error });
    }
});

module.exports = router;