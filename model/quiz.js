const { number, string } = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuizSchema = new Schema({
    name: { type: String, required: true, unique: true },
    question_list: [

        {
            question_number: Number,
            question: String,
            option: {

            }

        }
    ],
    created_by: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    answers: {},


    is_published: {
        type: Boolean,
        default: false,
    },

    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    is_delete: { type: Boolean, default: false },
    updated_at: { type: Date, default: Date.now },

}, {
    collection: "Quiz",
    versionKey: false
}).index(
    {
        question: 1,
    },
    {
        unique: true,
        partialFilterExpression: { question: { $exists: true } },

    }
);

const Quiz = mongoose.model("Quiz", QuizSchema)
module.exports = Quiz




