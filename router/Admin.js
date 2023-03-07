
const express = require("express");
const router = express.Router();

const { adminquizschems } = require("../middleware/Admin.joi")

const { checkAuth } = require('../middleware/jwt')

// const admincontroller = require("../controllers/Admin/Admin.Question");
const admincontroller  = require("../controllers/Admin/Admin.Question")

const { Adminregisterschema,Adminloginschema } = require('../middleware/Admin.joi')
const { Quizcreateschema ,editQuizcreateschema } = require("../middleware/Admin.Quizcreate.joi")
const adminQuizcreatecontroller = require("../controllers/Admin/Admin.Quizcreate")
const Adminlogincontroller = require("../controllers/Admin/Admin")

router.post('/Adminregister', Adminregisterschema, Adminlogincontroller.AdminRegister);
router.post('/Adminlogin', Adminloginschema, Adminlogincontroller.Adminlogin);


router.post('/quiz-question', checkAuth("admin"), adminquizschems,admincontroller.QuizFunction);
router.get('/getquiz-question', checkAuth('admin'), admincontroller.GetQuizFunction);
router.put('/Editquiz-question/', checkAuth('admin'), admincontroller.UpdateQuizFunction);
router.delete('/removequiz-question/:id', checkAuth('admin'), admincontroller.DeleteQuizFunction);
router.get('/getsinglequiz-question/:id', checkAuth('admin'), admincontroller.GetQuizFunctionsingle);

//QUIZ
router.post('/quiz-create', checkAuth("admin"), Quizcreateschema, adminQuizcreatecontroller.AddQuiz);
router.get('/getquiz-quiz', checkAuth('admin'), adminQuizcreatecontroller.GetQuiz);
router.put('/Edit-quiz/:id', checkAuth('admin'), editQuizcreateschema , adminQuizcreatecontroller.UpdateQuiz);
router.delete('/remov-equiz/:id', checkAuth('admin'), adminQuizcreatecontroller.Deletequiz);
router.get('/getsingle-quiz/:id', checkAuth('admin'), adminQuizcreatecontroller.Getsinglequiz);

module.exports = router; 