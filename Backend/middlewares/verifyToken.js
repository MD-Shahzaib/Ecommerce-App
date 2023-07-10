const jwt = require('jsonwebtoken')
const secret = require("../config/jwt");

function verifyToken(req, res, next) {
    let token = req.headers.authorization;
    if (!token) {
        return res.send({ message: "Unable to access!" });
    }
    token = token.slice(7);
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: 'Authentication failed' });
        }
        req.decoded = decoded;
        next();
    });
}

module.exports = verifyToken;