const express = require("express");


const { checkAuth } = require('../middleware/jwt')

const { userloginschema, userregisterschema } = require('../middleware/user.joi')

const user_controller = require("../controllers/user/user");


const router = express.Router();

router.post('/register', userregisterschema, user_controller.userRegister);
router.post('/login', userloginschema, user_controller.userlogin);
// router.post('/quiz-question',  user_controller.QuizFunction);
module.exports = router; 