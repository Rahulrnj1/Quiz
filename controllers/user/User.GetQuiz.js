const express = require('express');
const jwt = require("jsonwebtoken");
const router = express.Router();
const Config = require("../../common/config");
const quizcreate = require("../../model/Quiz")
const Quizregister = require("../../model/quiz.participate")
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

    console.log(new Date())

    var date = new Date().toISOString().substring(0, 10)

    let query = {
        registration_start_datetime: { $lte: new Date(date) },
        registration_end_datetime: { $gte: new Date(date) },
        _id: { '$nin': existingregisteredQuizzes }
    }
    const aggreagate = [
        { $match: query },
    ]
    console.log(date);
    const quiz = await quizcreate.aggregate(aggreagate);
    // console.log(quiz)

    if (Object(quiz).length === 0) {
        return res.status(400).json({ status: 400, message: "quiz not find " });
    }
    else {
        return res.status(200).json({ status: 200, message: "quiz  find ", res: quiz });


    }
}
const usergetparticipateQuiz = async (req, res) => {

    try {
        var existingregisteredQuizzes = [];
        const registeredQuizzes = await Quizregister.find({ userid: req.userData.uid }, {
            _id: 0,
            quizid: true

        })
        registeredQuizzes.forEach((doc) => {
            existingregisteredQuizzes.push(doc.quizid);
        });


        var date = new Date().toISOString().substring(0, 10)
        let query = {
            registration_start_datetime: { $lte: new Date(date) },
            registration_end_datetime: { $gte: new Date(date) },
            _id: { '$nin': existingregisteredQuizzes }
        }

        const aggreagate = [
            { $match: query },
        ]

        const user = await Quizregister.find({}).sort();
        console.log(registeredQuizzes)
        return res.status(200).json({ status: 200, message: "Get All registerQuiz  succesfully", data: user });

    }
    catch (ex) {
        console.log(ex.message);
        return res.status(500).json({ status: 500, message: "error" })
    }

};


module.exports = { usergetQuiz, usergetparticipateQuiz }