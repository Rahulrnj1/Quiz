const { number, string } = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuizSchema = new Schema(
    {
        quizname: { type: String, default: '', unique: true },
        participants: { type: String, default: '' },
        Start_time: { type: String, default: '' },
        end_time: { type: String, default: '' },
        registration_start_datetime: { type: Date, default: '' },
        registration_end_datetime: { type: Date, default: '' },
        quiz_date:{ type: Date, default: '' },
        no_of_Questions: { type: String, default: '' },
        is_active: { type: Boolean, default: true },
        created_at: { type: Date, default: Date.now },
        is_delete: { type: Boolean, default: false },
        updated_at: { type: Date, default: Date.now },
    }, {
    collection: "Quiz",
    versionKey: false
});

const Quiz = mongoose.model('Quiz', QuizSchema);
module.exports = Quiz;