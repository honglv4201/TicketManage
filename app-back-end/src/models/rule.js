const mongoose = require("mongoose");

const RuleSchema = new mongoose.Schema(
    {
        book: {
            type: Number,
            required: true
        },
        cancel: {
            type: Number,
            required: true
        },
        max: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Rule", RuleSchema);