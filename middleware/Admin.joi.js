const joi = require('joi');
const validateSchema = require('./validation')


const Adminregisterschema = async (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(5).max(50).required(),
    email: joi.string().min(5).max(255).required().email(),
    password: joi.string().min(5).max(255).required()
  });

  validateSchema(req, res, next, schema);

}

const Adminloginschema = async (req, res, next) => {
  const schema = joi.object({
    email: joi.string().min(5).max(255).required().email(),
    password: joi.string().min(5).max(255).required()
  });

  validateSchema(req, res, next, schema);

}
const adminquizschems = async (req, res, next) => {
  const schema = joi.array().items(
    joi.object({
      subjectId:joi.string().required(),
      question: joi.string().required(),
      option: joi.array().required(),
      answers: joi.string().required()
    })
  )
  validateSchema(req, res, next, schema);
};

// const adminquizschems = async (req, res, next) => {
//   const schema = joi.object({
//     question: joi.string().required(),
//     option: joi.array().items(joi.object()).required(),
//     answers: joi.string().required(),
//   });


//   validateSchema(req, res, next, schema);

// }

const editadminquizschems = async (req, res, next) => {
  const schema = joi.object({
    // subjectId:joi.string().required(),
    question: joi.string().required(),
    options: joi.array().items(joi.string()).required(),
    answer: joi.string().required(),


  });

  validateSchema(req, res, next, schema);

}


const subjectschema = async (req, res, next) => {
  const schema = joi.object({
    subject_name: joi.string().required()

  });

  validateSchema(req, res, next, schema);

}

module.exports = { Adminregisterschema, Adminloginschema, adminquizschems, editadminquizschems, subjectschema }