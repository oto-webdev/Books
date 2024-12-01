import jwt from 'jsonwebtoken'
import expressAsyncHandler from 'express-async-handler'
import User from '../models/User.js'

export const protect = expressAsyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.SECRET_JWT);

            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            return res.status(401).json({ message: "Not Authorized, Token failed" });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Not Authorized, No token" });
    }
});
