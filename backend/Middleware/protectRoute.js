import jwt from 'jsonwebtoken';
import User from '../Model/userModel.js';

const protectRoute = async (req, res, next) => {
    try {
        // console.log("jwt token from cookies:", req.cookies.jwt);

        // const token = req.cookies.jwt
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized - No Token Provided' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(400).send({ error: 'Unauthorized - Invalid Token' });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(400).send({ error: 'User not found' })
        };

        req.user = user

        next();

    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Internal server error' })
    }
}

export default protectRoute;