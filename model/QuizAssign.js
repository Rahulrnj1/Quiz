const { number, string } = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const reportSchema = new Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        quizId: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
    },

    { timestamps: true }
);
const Report = mongoose.model('Report', reportSchema);
module.exports = Report;
