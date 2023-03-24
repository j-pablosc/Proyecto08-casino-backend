const Account = require("../models/acount.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const {PRIVATE_KEY} = process.env;

const login = async (req, res) => {
    try {
        const user = req.body;
        const userDB = await Account.findOne({ email: user.email });
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                message: "la cuenta no existe, creela y hablamos",
            });
        }
        // if (user.password == userDB.password) {
        //     console.log("contraseña confirmada");

        // } else { console.log("contraseña erronea"); }
        const passwordMatch = await bcrypt.compare(user.password, userDB.password);
        console.log(passwordMatch);
        if (!passwordMatch) {
            return res.status(401).json({
                ok: false,
                message: "clave no valida, recuerdela y hablamos",
            });
        }
        const token = jwt.sign(
            {
                id: userDB._id,
                email: user.email,
                fullName: userDB.fullName,
            },
            process.env.PRIVATE_KEY
        );
        return res.status(200).json({
            ok: false,
            token,
        });
        // return res.send("el usuario si exite, alegrese");
    } catch (error) {
        res.send(error.message);
    }
};

const signup = async (req, res) => {
    try {
        const user = req.body;

        const exists = await Account.exists({ email: user.email });
        if (exists) {
            return res.status(409).json({
                ok: false,
                message: "la cuenta ya existe, acuerdese",
            });
        }
        // console.log(user);
        // console.log(saltRounds);
        const passwordHash = await bcrypt.hash(user.password, saltRounds);
        // console.log(passwordHash);
        user.password = passwordHash;

        const newAccount = await Account.create(user);

        const token = jwt.sign(
            {
                id: newAccount._id,
                email: user.email,
                user: user.fullName,
            },
            process.env.PRIVATE_KEY
        );

        return res.status(201).json({
            ok: true,
            token,
            message: "cuenta creada, muy bien",
        });
    } catch (error) {
        // console.log(error);
        return res.status(400).json({
            ok: false,
            message: error.message,
        });
    }
};

module.exports = {
    login,
    signup,
};
