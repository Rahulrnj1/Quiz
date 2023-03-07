const express = require("express");


const { checkAuth } = require('../middleware/jwt')

const { userloginschema, userregisterschema, reportschema, Quizregisterschema } = require('../middleware/user.joi')

const user_controller = require("../controllers/user/user");
const userscontroller = require("../controllers/user/User.quiz")
const Quizuser = require("../controllers/user/User.GetQuiz")
const Quizregistater = require("../controllers/user/user.quiz.registation")


const router = express.Router();

router.post('/register', userregisterschema, user_controller.userRegister);
router.post('/login', userloginschema, user_controller.userlogin);

router.get("/:quizId", checkAuth('user'), userscontroller.startExam);
router.post("/report", checkAuth('user'), userscontroller.submitExam);

router.get('/quizcreate/:quizname', checkAuth('user'), Quizuser.usergetQuiz);
router.get("/quizget/:getregisterquiz", checkAuth('user'), Quizuser.usergetparticipateQuiz);
// router.get("/quiz-register/:quizstart", checkAuth('user'), Quizuser.Quizstart);
// Quiz register user
router.post('/quiz-register', checkAuth('user'), Quizregisterschema, Quizregistater.Quizregistation);

router.post("/publish", checkAuth('user'), userscontroller.publishQuiz);

module.exports = router; 