const joi = require('joi');
const validateSchema = require('./validation')


const Quizcreateschema = async (req, res, next) => {
    const schema = joi.object({
        subjectId:joi.string().required(),
        quizname: joi.string().required(),
        participants: joi.string().required(),
        Start_time: joi.string().required(),
        end_time: joi.string().required(),
        quiz_date: joi.string().required(),
        registration_start_datetime: joi.string().required(),
        registration_end_datetime: joi.string().required(),
        no_of_Questions: joi.string().required(),
    });

    validateSchema(req, res, next, schema);

}

const editQuizcreateschema = async (req, res, next) => {
    const schema = joi.object({
        quizname: joi.string().required(),
        participants: joi.string().required(),
        Start_time: joi.string().required(),
        end_time: joi.string().required(),
        quiz_date: joi.string().required(),
        registration_start_datetime: joi.string().required(),
        registration_end_datetime: joi.string().required(),
        no_of_Questions: joi.string().required(),

    });

    validateSchema(req, res, next, schema);

}




module.exports = { Quizcreateschema, editQuizcreateschema }