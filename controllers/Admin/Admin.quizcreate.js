const express = require('express');
const User = require('../../model/user');
const QuizSchema = require('../../model/quiz')
const jwt = require("jsonwebtoken");
const secretkey = "secretkey"
const bcrypt = require('bcrypt');
const router = express.Router();
const Config = require("../../common/config");
const quiz = require('../../model/quiz');
const { response } = require('express');

const QuizFunction = async (req, res) => {
    try {
        // console.log(req.userData);
        if (req.userData.usertype == "admin") {
            const user = await User.findOne({ email: req.userData.email });
            if (!user) {
                response = { status: "error", message: "No user exist", data: {} };
                res.status(401).send(response);
            }
            const quizdata = await QuizSchema.findOneAndUpdate({ question: req.body.question }, req.body,
                {
                    upsert: true,
                    new: true,
                    setDefaultsOnInsert: true
                })
            res.json(quizdata)

        }

        else {
            res.send('only admin can create quiz question')
        }
    } catch (err) {
        res.send(err)
    }
}
module.exports = { QuizFunction }
