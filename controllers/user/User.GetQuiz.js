const express = require('express');
const jwt = require("jsonwebtoken");
const router = express.Router();
const Config = require("../../common/config");
const quizcreate = require("../../model/Quizcreate")
const { response } = require('express');

const usergetQuiz = async (req, res) => {

    var date = new Date()
    let query = {
        registration_start_datetime: { $lte: date },
        registration_end_datetime: { $gte: date }

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