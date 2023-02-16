const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuizSchema = new Schema({
    question: { type: String, required: true },
    options: { type: Array, default: [] },
    answer: { type: String, required: true },
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    is_delete: { type: Boolean, default: false },
    updated_at: { type: Date, default: Date.now },

}, {
    collection: "quiz",
    versionKey: false
});


module.exports = mongoose.model('quizs', QuizSchema);

