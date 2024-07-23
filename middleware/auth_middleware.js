const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    const token = req.headers['access-token'];
    if (!token){
        return res.status(403).send('No token provided');
    }
    jwt.verify(token,secretKey , (err, decoded) =>{
        if(err){
            return res.status(500).send('Failed to authenticate token');
        }
        req.id = decoded.id;
        next();
    });
};

module.exports = verifyToken;