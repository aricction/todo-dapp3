const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    const token = req.header('x-auth-token'); 
    if (!token) {
        return res.status(401).json({ msg: 'No token found, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded.user;       
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is invalid' });
    }
};

module.exports = verifyToken;
