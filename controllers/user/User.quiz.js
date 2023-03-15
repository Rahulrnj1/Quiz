const express = require('express');
const jwt = require("jsonwebtoken");
const secretkey = "secretkey"
const bcrypt = require('bcrypt');
const router = express.Router();
const Config = require("../../common/config");
const Question = require('../../model/Question');
const Report = require('../../model/QuizAssign')
const quizcreate = require("../../model/Quiz")
const Quizregister = require("../../model/quiz.participate");
const Quiz = require('../../model/Quiz');
var mongoose = require('mongoose');



const startExam = async (req, res, next) => {
    try {
        const quizId = req.params.quizId;
        const data = await quiz.findById(quizId, {
            name: 1,
            questions_list: 1,
            is_published: 1,
        });
        // console.log(req.userData)
        if (!data) {
            return res.status(405).json({ status: error, message: "No quiz found! ", data: data })

        }

        if (!data.is_published) {
            return res.status(405).json({ status: "error", message: "Quiz is not published! ", data: data })

        }
        return res.status(200).json({ status: "success", message: "Quiz ", data: data })

    } catch (error) {
        next(error);
    }
};

const submitExam = async (req, res, next) => {
    try {
        const quizId = req.body.quizId;
        const attempted_question = req.body.attempted_question;

        const Quiz = await Question.findById(quizId, { answers: 1 });
        const answers = Quiz.answers;

        const userId = req.userData.uid;
        const allQuestions = Object.keys(answers);
        const total = allQuestions.length;

        let score = 0;

        // await Report.deleteMany({ userId: req.userData.uid });
        for (let i = 0; i < total; i++) {
            let question_number = allQuestions[i];
            if (
                !!attempted_question[question_number] &&
                answers[question_number] == attempted_question[question_number]
            ) {
                score = score + 1;
            }
        }

        const report = new Report({ userId, quizId, score, total });
        const data = await report.save();
        return res.status(200).json({ status: "success", message: "Quiz ", data: { total, score, ReportId: data._id } })


    } catch (error) {
        next(error);
    }
};

const publishQuiz = async (req, res, next) => {
    try {

        const Quizdetails = await Quiz.findOne({ _id: req.body.quizId });
        if (Quizdetails.length === 0) {
            return res.status(404).json({ status: 404, message: "Quiz not found!" })
        }


        const registeredQuizzes = await Quizregister.find({ quizid: req.body.quizId, userId: req.userData.uid })

        if (registeredQuizzes.length === 0) {
            return res.status(404).json({ status: 404, message: "QuizParticipate  not found!" })
        }
        // console.log( req.userData.uid)
        // console.log(req.body.quizId)
        // console.log(registeredQuizzes)
        const quizId = req.body.quizId;
        const data = await quizcreate.findById(quizId);
        if (!data) {
            return res.status(404).json({ status: 404, message: "Quiz not found!" })
        }

        var aggreagate = [

            { $match: { subjectId: Quizdetails.subjectId } },
            { $sample: { size: Number(Quizdetails.no_of_Questions) } },

        ]

        // console.log(aggreagate);
        const quizs = await Question.aggregate(aggreagate);

        return res.status(200).json({ status: 200, message: "Quiz published!", data: quizs });

    } catch (error) {
        next(error);
    }
}


module.exports = { startExam, submitExam, publishQuiz }