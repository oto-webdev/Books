import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/User.js';

const createToken = (id) => {
    const token = jwt.sign({ id }, process.env.SECRET_JWT, { expiresIn: "2m" });
    return token;
};

export const register = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
        return res.status(409).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    try {
        const user = await User.create({
            name,
            email,
            password: hashed,
        });

        const token = createToken(user._id);

        user.token = token;

        return res.status(201).json({ message: "New User", user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export const login = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
        return res.status(401).json({ message: "Password does not match" });
    }

    try {
        const token = createToken(user._id);

        return res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export const getMe = expressAsyncHandler(async (req, res) => {
    try{    
        const {_id, name, email} = await User.findById(req.user.id)
        return res.status(200).json({
            id: _id,
            name,
            email
        })
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
})