const { number, string } = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuizregisterSchema = new Schema(
    {
        quizid: { type: mongoose.Types.ObjectId, required: true },
        userId: { type: mongoose.Types.ObjectId, required: true },
        registration_date: { type: Date, default: '' },
        is_active: { type: Boolean, default: true },
        created_at: { type: Date, default: Date.now },
        is_delete: { type: Boolean, default: false },
        updated_at: { type: Date, default: Date.now },
    }, {
    collection: "Quizregister",
    versionKey: false
});

const Quizregister = mongoose.model('Quizregister', QuizregisterSchema);
module.exports = Quizregister;