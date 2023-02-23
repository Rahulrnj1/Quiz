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
        is_active: { type: Boolean, default: true },
        created_at: { type: Date, default: Date.now },
        is_delete: { type: Boolean, default: false },
        updated_at: { type: Date, default: Date.now },
    }, {
    collection: "Report",
    versionKey: false
});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;
