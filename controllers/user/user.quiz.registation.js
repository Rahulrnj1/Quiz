const express = require('express');
const jwt = require("jsonwebtoken");
const router = express.Router();
const Config = require("../../common/config");
const Quizregister = require("../../model/quiz.participate")


const Quizregistation = async (req, res) => {
    try {
        let quiz = await Quizregister.findOne({ userId: req.userData.uid, quizid: req.body.quizid });
        // console.log(quiz)
        if (quiz) return res.status(400).json({ message: "Quiz already registered"})


        quiz = new Quizregister({
            userId: req.userData.uid,
            quizid: req.body.quizid,
            registration_date: req.body.registration_date
        });
        await quiz.save();
        return res.status(200).json({ data: { success: true, message: "Quiz register Successfully", data: { registerId: quiz._id } } });

    } catch (error) {
        next(error);
    }


}
module.exports = { Quizregistation }