const { number, string } = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const subjectSchema = new Schema({
    subject_name: { type: String, default: '' },
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    is_delete: { type: Boolean, default: false },
    updated_at: { type: Date, default: Date.now },
}, {
    collection: "subject",
    versionKey: false
}).index(
    {
        subject_name: 1

    },
    {
        unique: true,
        partialFilterExpression: { subject_name: { $exists: true } },

    }
);


const subject = mongoose.model('subject', subjectSchema);
module.exports = subject;
