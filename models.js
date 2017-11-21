'use strict'
var mongoose = require('mongoose');

var Schema = mongoose.Schema

var AnswerSchema = new Schema({
    text: String,
    CreatedAt: {type: Date, default: Date.now},
    UpdatedAt:{type: Date, default:Date.now},
    votes: {type: Number, default: 0}

});

var QuestionSchema = new Schema({
    text: String,
    CreatedAt: {type: Date, default: Date.now},
    answer: [AnswerSchema]

});

var Questions = mongoose.model("Question", QuestionSchema)
module.exports.Question = Question