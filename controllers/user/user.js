const express = require('express');
const User = require('../../model/user');
const QuizSchema = require('../../model/quiz')
const jwt = require("jsonwebtoken");
const secretkey = "secretkey"
const bcrypt = require('bcrypt');
const router = express.Router();
const Config = require("../../common/config");
const quiz = require('../../model/quiz');
const userRegister = async (req, res) => {

    let user = await User.findOne({ email: req.body.email });
    var hashedPassword = await bcrypt.hash(req.body.password, Config.SALT_WORK_FACTOR)

    if (user)
        return res.status(400).send("User Already registered");


    user = new User({
        name: req.body.name,
        email: req.body.email,
        usertype:"user",
        password: hashedPassword
    });
    await user.save();
    return res.status(200).json({ data: { success: true, message: "user register Successfully", data: user } });
    // res.send(user);
};
const userlogin = async (req, response) => {

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        resp = { status: "error", message: "No user exist", data: {} };
        response.status(401).send(res);
    }
    // console.log(user)
    const status = await bcrypt.compare(req.body.password, user.password);
    if (status) {
        const token = jwt.sign({ uid : user._id, usertype :"user"}, secretkey, { expiresIn: '30d' })
        resp = { status: "success", message: "User logged in", data: { token } };
        response.status(200).send(resp)
    }

    else {
        resp = { status: "error", message: "Credentails mismatch", data: {} };
        response.status(401).send(resp);
    }


}
module.exports = { userRegister, userlogin }