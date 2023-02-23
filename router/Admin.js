
const express = require("express");
const router = express.Router();


const { adminquizschems } = require("../middleware/Admin.joi")
const { checkAuth } = require('../middleware/jwt')
const admincontroller = require("../controllers/Admin/Admin.quizcreate");

const { Adminregisterschema, Adminloginschema } = require('../middleware/Admin.joi')

const Adminlogincontroller = require("../controllers/Admin/Admin");


router.post('/Adminregister', Adminregisterschema, Adminlogincontroller.AdminRegister);
router.post('/Adminlogin', Adminloginschema, Adminlogincontroller.Adminlogin);




router.post('/quiz-question', checkAuth("admin"), admincontroller.QuizFunction);
router.get('/getquiz-question', checkAuth('admin'), admincontroller.GetQuizFunction);
router.put('/Editquiz-question/:id', checkAuth('admin'), adminquizschems, admincontroller.UpdateQuizFunction);
router.patch("/publish", checkAuth('admin'), admincontroller.publishQuiz);
router.delete('/removequiz-question/:id', checkAuth('admin'), admincontroller.DeleteQuizFunction);

router.get('/getsinglequiz-question/:id', checkAuth('admin'), admincontroller.GetQuizFunctionsingle);


module.exports = router; 