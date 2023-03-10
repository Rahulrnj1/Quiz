const { number, string } = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionSchema = new Schema({
    question: { type: String, default: '' },
    option: [],

    answers: { type: String, default: '' },
    subjectId: {
        type: mongoose.Types.ObjectId, default: ''
       
    },
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    is_delete: { type: Boolean, default: false },
    updated_at: { type: Date, default: Date.now },

}, {
    collection: "Question",
    versionKey: false

});

const Question = mongoose.model("Question", QuestionSchema)
module.exports = Question




