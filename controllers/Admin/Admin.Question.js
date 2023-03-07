const express = require('express');
const User = require('../../model/user');
const jwt = require("jsonwebtoken");
const secretkey = "secretkey"
const bcrypt = require('bcrypt');
const router = express.Router();
const Config = require("../../common/config");
const Question = require("../../model/Question")
const quizcreate = require("../../model/Quiz")
const Quizregister = require("../../model/quiz.participate")
const { response } = require('express');
const { options } = require('joi');

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


        const quizs = await  Question.insertMany(req.body);
        return res.status(200).json({ status: 200, message: "Create Question succesfully", data: req.body });

    } catch (error) {
        next(error);
    }
}


const GetQuizFunction = async (req, res) => {
    try {
        // console.log(req.userData)
        const user = await Question.find({}).sort();
        return res.status(200).json({ status: 200, message: "Get All Question succesfully", data: user });
    }
    catch (ex) {
        console.log(ex.message);
        return res.status(500).json({ status: 500, message: "error" })
    }

};
const UpdateQuizFunction = async (req, res, next) => {

    try {

        const quizId = req.body._id;

        const quiz = await Question.findById(quizId);
        // console.log(quiz)

        if (!quiz) {
            return res.status(404).json({ status: 404, message: "Question not found!" });
        }

        if (!req.userData.uid) {
            return res.status(403).json({ status: 403, message: "You are not authorized!" });
        }

        if (quiz.is_published) {
            return res.status(405).json({ status: 405, message: "You cannot update, published Quiz!" });
        }
        if (quiz.name != req.body.name) {
            let status = await (req.body.name);
            if (!status) {
                return res.status(422).json({ status: 422, message: "Please enter an unique quiz name." });
            }
            quiz.name = req.body.name;
        }
        quiz.question_list = req.body.question_list;
        quiz.answers = req.body.answers;

        await quiz.save();
        return res.status(200).json({ status: 200, message: "Question updated successfully", data: quiz });
    } catch (error) {
        next(error);
    }
};
const DeleteQuizFunction = async (req, res) => {

    const data = await Question.findOne({ _id: req.params.id })
    // console.log(data)
    if (data) {
        const qes = await Question.findByIdAndRemove(req.params.id);
        if (!qes) return res.status(500).json({ status: 500, message: "The Question is not present by id" })
        return res.status(200).json({ status: 200, message: "Question Deleted successfully" });

    }
    else {
        return res.status(500).json({ status: 500, message: "The Question is not present by id" });
    }

};

const GetQuizFunctionsingle = async (req, res) => {

    try {
        const data = await Question.findById(req.params.id);
        return res.status(200).json({ status: 200, message: "The Question with the given ID", data: data });

        // res.send(Quiz);
    }
    catch (ex) {
        console.log(ex.message);
        if (!data) return res.status(404).send('the Question with the given ID');

    }
};
const publishQuiz = async (req, res, next) => {
    try {
        // const registeredQuizzes = await Quizregister.find({ quizId: req.params.quizId, userid: req.userData.uid }, {
        //     _id: 0,
        //     quizid: true

        // })
        const registeredQuizzes = await Quizregister.find({ quizid: req.body.quizId, userId: req.userData.uid }) 
        
        if (!registeredQuizzes) {
            return res.status(404).json({ status: 404, message: "Quiz not found!" })
        }
        // console.log( req.userData.uid)
        // console.log(req.body.quizId)
        console.log(registeredQuizzes)
        // const quizId = req.body.quizId;
        // const data = await quizcreate.findById(quizId);
        // // console.log(data)

        // if (!data) {
        //     return res.status(404).json({ status: 404, message: "Quiz not found!" })
        // }
        // var aggreagate = [
        //     { $sample: { size: 5 } },
        // ]
        // console.log(date);
        // const quizs = await Quiz.aggregate(aggreagate);
        // console.log(quizs)
        // // let randomDocs = Quiz.aggregate(
        // //     [ { $sample: { size: 5 } } ]
        // // )
        // // data.is_published = true;
        // await data.save();
        // return res.status(200).json({ status: 200, message: "Quiz published!", data: quizs });

    } catch (error) {
        next(error);
    }
}



module.exports = { QuizFunction, GetQuizFunction, UpdateQuizFunction, DeleteQuizFunction, GetQuizFunctionsingle, publishQuiz }
