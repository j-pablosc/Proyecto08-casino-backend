const jwt = require("jsonwebtoken");
const config = process.env;

const authValidation = (req, res, next) => {
    const token = req.body.token || req.header("token");

    if (!token) {
        return res.status(403).send("Se requiere un token para la autenticación");
    }
    try {
        const decoded = jwt.verify(token, config.PRIVATE_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Token Invalido");
    }
    return next();
};

module.exports = {
    authValidation,
};
