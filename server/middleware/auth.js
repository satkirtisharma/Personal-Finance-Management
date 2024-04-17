const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];

        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(200).send({
                    message: "Auth failed",
                    success: false
                });
            } else {
                req.user = { userId: decode.id };
                next();
            }
        });
    } catch (e) {
        console.log("Error in authentication middleware");
        res.status(401).send({ message: "Authentication Failed", success: false });
    }
};
