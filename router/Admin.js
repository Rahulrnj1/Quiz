
const express = require("express");
const router = express.Router();


const { adminquizschems } = require("../middleware/Admin.joi")
const { checkAuth } = require('../middleware/jwt')
const admincontroller = require("../controllers/Admin/Admin.quizcreate");

const { Adminregisterschema,Adminloginschema } = require('../middleware/Admin.joi')

const Adminlogincontroller = require("../controllers/Admin/Admin");


router.post('/Adminregister', Adminregisterschema, Adminlogincontroller.AdminRegister);
router.post('/Adminlogin', Adminloginschema ,Adminlogincontroller.Adminlogin);




router.post('/quiz-question', checkAuth,adminquizschems, admincontroller.QuizFunction);

module.exports = router; 