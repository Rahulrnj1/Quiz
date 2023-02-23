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

//     try {
//         // console.log(req.userData);
//         if (req.userData.usertype == "admin") {
//             const user = await User.findOne({ email: req.userData.email });
//             // userid: req.body.userid

//             if (!user) {
//                 response = { status: "error", message: "No user exist", data: {} };
//                 res.status(401).send(response);
//             }
//             const quizdata = await QuizSchema.findOneAndUpdate({ question: req.body.question }, req.body,
//                 {
//                     upsert: true,
//                     new: true,
//                     setDefaultsOnInsert: true
//                 })
//             res.json(quizdata)

//         }

//         else {
//             res.send('only admin can create quiz question')
//         }
//     } catch (err) {
//         res.send(err)
//     }
// }

const QuizFunction = async (req, res, next) => {
    try {
        const created_by = req.userData.uid
        const name = req.body.name;
        const question_list = req.body.question_list;
        const answers = req.body.answers;
        // console.log(req.userData)
        const quizs = new quiz({ name, question_list, created_by, answers });
        const result = await quizs.save();
        return res.status(200).json({ status: 200, message: "Create quiz succesfully", data: { quizId: quizs._id } });

    } catch (error) {
        next(error);
    }
}


const GetQuizFunction = async (req, res) => {
    try {
        // console.log(req.userData)
        const user = await quiz.find({}).sort();
        return res.status(200).json({ status: 200, message: "Get All quiz succesfully", data: user });
    }
    catch (ex) {
        console.log(ex.message);
        return res.status(500).json({ status: 500, message: "error" })
    }

};
const UpdateQuizFunction = async (req, res) => {

    // console.log(req.body)

    const data = await quiz.findOne({ _id: req.params.id, isdeleted: false })
    if (data) {
        const question = await quiz.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!question) return res.status(500).send({ status: 500, message: "the quiz with given ID", data: question });

        return res.status(200).json({ status: 200, message: "quiz updated successfully", data: question });
    }
    else {
        return res.status(500).json({ status: 500, message: "quiz is not found " });

    }
}
const DeleteQuizFunction = async (req, res) => {

    const data = await quiz.findOne({ _id: req.params.id })
    // console.log(data)
    if (data) {
        const qes = await quiz.findByIdAndRemove(req.params.id);
        if (!qes) return res.status(500).json({ status: 500, message: "The quiz is not present by id" })
        return res.status(200).json({ status: 200, message: "quiz Deleted successfully" });

    }
    else {
        return res.status(500).json({ status: 500, message: "The quiz is not present by id" });
    }

};

const GetQuizFunctionsingle = async (req, res) => {

    try {
        const data = await quiz.findById(req.params.id);
        return res.status(200).json({ status: 200, message: "The Quiz with the given ID", data: data });

        // res.send(Quiz);
    }
    catch (ex) {
        console.log(ex.message);
        if (!data) return res.status(404).send('the Quiz with the given ID');

    }
};
const publishQuiz = async (req, res, next) => {
    try {
        const quizId = req.body.quizId;
        const data = await quiz.findById(quizId);
        // console.log(data)

        if (!data) {
            return res.status(404).json({ status: 404, message: "Quiz not found!" })
        }

        data.is_published = true;
        await data.save();
        return res.status(200).json({ status: 200, message: "Quiz published!", data: {} });

    } catch (error) {
        next(error);
    }
}



module.exports = { QuizFunction, GetQuizFunction, UpdateQuizFunction, DeleteQuizFunction, GetQuizFunctionsingle, publishQuiz }
