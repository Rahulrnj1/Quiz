const { number, string } = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuizcreateSchema = new Schema(
    {
        quizname: { type: String, default: '', unique: true },
        participants: { type: String, default: '' },
        Start_time: { type: String, default: '' },
        end_time: { type: String, default: '' },
        registration_start_time: { type: String, default: '' },
        registration_end_time: { type: String, default: '' },
        no_of_Questions: { type: String, default: '' },
        is_active: { type: Boolean, default: true },
        created_at: { type: Date, default: Date.now },
        is_delete: { type: Boolean, default: false },
        updated_at: { type: Date, default: Date.now },
    }, {
    collection: "Quizcreate",
    versionKey: false
});

const Quizcreate = mongoose.model('Quizcreate', QuizcreateSchema);
module.exports = Quizcreate;