const express = require('express');
const User = require('../../model/user');
const jwt = require("jsonwebtoken");
const router = express.Router();
const Config = require("../../common/config");
const quizcreate = require("../../model/Quiz")
const { response } = require('express');


const AddQuiz = async (req, res) => {

    try {
        // console.log(req.body)
       
        let data = new quizcreate(req.body);
        data = await data.save();


        return res.status(200).json({ status: 200, message: "Quizcreate created successfully", bodydata: req.body, });
    }
    catch (error) {
        return res.status(400).json({ status: 400, error: error.message, message: "invalid " });

    }
};
const GetQuiz = async (req, res) => {
    try {
        // console.log(req.userData)
        const user = await quizcreate.find({}).sort();
        return res.status(200).json({ status: 200, message: "Get All quiz succesfully", data: user });
    }
    catch (ex) {
        console.log(ex.message);
        return res.status(500).json({ status: 500, message: "error" })
    }

};
const UpdateQuiz = async (req, res) => {

    const data = await quizcreate.findOne({ _id: req.params.id, isdeleted: false })
    if (data) {
        const quiz = await quizcreate.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!quiz) return res.status(500).send({ status: 500, message: "the Quiz with given ID", data: quiz });

        return res.status(200).json({ status: 200, message: "quiz Quizsuccessfully", data: quiz });
    }
    else {
        return res.status(500).json({ status: 500, message: "Quiz not found " });

    }

};

const Deletequiz = async (req, res) => {

    const data = await quizcreate.findOne({ _id: req.params.id })
    // console.log(data)
    if (data) {
        const quiz = await quizcreate.findByIdAndRemove(req.params.id);
        if (!quiz) return res.status(500).json({ status: 500, message: "the quiz is not present by id" })
        return res.status(200).json({ status: 200, message: "quiz Deleted successfully" });

        // res.send(blog)
    }
    else {
        return res.status(500).json({ status: 500, message: "quiz is Deleted " });
    }

};

const Getsinglequiz = async (req, res) => {
    // console.log(req.userData)
    // console.log("234")
    try {


        const data = await quizcreate.findById(req.params.id);

        return res.status(200).json({ status: 200, message: "The quiz with the given ID", data: data });

    }
    catch (ex) {
        console.log(ex.message);
        if (!data) return res.status(404).send('the quiz with the given ID');

    }
};
module.exports = { AddQuiz, GetQuiz, UpdateQuiz, Deletequiz, Getsinglequiz }