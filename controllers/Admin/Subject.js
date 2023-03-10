const express = require('express');
const jwt = require("jsonwebtoken");
const router = express.Router();
const Config = require("../../common/config");
const { response } = require('express');
const subject = require('../../model/subject');


const Addsubject = async (req, res) => {

    try {
        console.log(req.userData.uid)

        let data = new subject(req.body);
        data = await data.save();


        return res.status(200).json({ status: 200, message: "subject created successfully", bodydata: req.body, });
    }
    catch (error) {
        return res.status(400).json({ status: 400, error: error.message, message: "invalid " });

    }
};
module.exports = { Addsubject }