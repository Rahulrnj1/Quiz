const express = require('express');
const User = require('../../model/user');
const QuizSchema = require('../../model/quiz')
const jwt = require("jsonwebtoken");
const secretkey = "secretkey"
const bcrypt = require('bcrypt');
const Config = require("../../common/config");
// const { response } = require('express');
const AdminRegister = async (req, res) => {

    let user = await User.findOne({ email: req.body.email });
    var hashedPassword = await bcrypt.hash(req.body.password, Config.SALT_WORK_FACTOR)

    if (user)
        return res.status(400).send('Admin  already registered');


    user = new User({
        name: req.body.name,
        email: req.body.email,
        usertype:"admin",
        password: hashedPassword
    });
    await user.save();
    return res.status(200).json({ data: { success: true, message: "Admin register Successfully", data: user } });
};
const Adminlogin = async (req, response) => {

    const admin = await User.findOne({ email: req.body.email });
    if (!admin) {
        resp = { status: "error", message: "No admin exist", data: {} };
        response.status(401).send(res);
    }
    const status = await bcrypt.compare(req.body.password, admin.password);
    if (status) {
        const token = jwt.sign({ user : admin }, secretkey, { expiresIn: '30d' })
        resp = { status: "success", message: "admin logged in", data: { token } };
        // console.log(admin)
        response.status(200).send(resp)
    }

    else {
        resp = { status: "error", message: "Credentails mismatch", data: {} };
        
        response.status(401).send(resp);
    }


}

module.exports = { AdminRegister, Adminlogin }