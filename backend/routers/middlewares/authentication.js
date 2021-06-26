const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    try {
        if (!req.headers.authorization)
            return res.status(403).json({ message: 'forbidden' });

        const  token = req.headers.authorization.split(' ')[1];

        const parsedToken = jwt.verify(token, process.env.SECRET);

		req.token = parsedToken;

		next();
        
        const pa
    } catch (error) {
        res.status(403).json({ message: 'forbidden' });
    }
}

module.exports = authentication;