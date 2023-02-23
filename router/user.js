const express = require("express");


const { checkAuth } = require('../middleware/jwt')

const { userloginschema, userregisterschema } = require('../middleware/user.joi')

const user_controller = require("../controllers/user/user");
const userscontroller = require("../controllers/user/User.quiz")


const router = express.Router();

router.post('/register', userregisterschema, user_controller.userRegister);
router.post('/login', userloginschema, user_controller.userlogin);

router.get("/:quizId", checkAuth('user'),userscontroller.startExam);
router.post("/report", checkAuth('user'),userscontroller.submitExam);


module.exports = router; 