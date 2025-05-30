const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).json({ message: "403 Forbidden" });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: "401 Unauthorized"
        });
    }
}


module.exports = authMiddleware;