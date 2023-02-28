const express = require('express');
const jwt = require("jsonwebtoken");
const router = express.Router();
const Config = require("../../common/config");
const quizcreate = require("../../model/Quizcreate")
const Quizregister = require("../../model/quiz.Registation")
const { response } = require('express');

const usergetQuiz = async (req, res) => {

    var existingregisteredQuizzes = [];
    const registeredQuizzes = await Quizregister.find({ userid: req.userData.uid }, {
        _id: 0,
        quizid: true

    })
    registeredQuizzes.forEach((doc) => {
        existingregisteredQuizzes.push(doc.quizid);
    });

    console.log(existingregisteredQuizzes)

    var date = new Date()
    date = date.toLocaleDateString();
    let query = {
        registration_start_datetime: { $lte: new Date(date) },
        registration_end_datetime: { $gte: new Date(date) },
        _id: { '$nin': existingregisteredQuizzes }
    }
    const aggreagate = [
        { $match: query },
    ]
    // console.log(aggreagate);
    const quiz = await quizcreate.aggregate(aggreagate);
    // console.log(quiz)

    if (Object(quiz).length === 0) {
        return res.status(400).json({ status: 400, message: "quiz not find " });
    }
    else {
        return res.status(200).json({ status: 200, message: "quiz  find ", res: quiz });


    }
}


module.exports = { usergetQuiz }