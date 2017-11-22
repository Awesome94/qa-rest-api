'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema

var sortAnswers = function(){
    if (a.votes === b.votes){
        return a.UpdatedAt - b.UpdatedAt;
    }
    return b.votes - a.votes;
}

var AnswerSchema = new Schema({
    text: String,
    CreatedAt: {type: Date, default: Date.now},
    UpdatedAt:{type: Date, default:Date.now},
    votes: {type: Number, default: 0}

});

AnswerSchema.method("update", function(updates, callback){
    Object.assign(this, updates, {UpdatedAt: new Date()} )
    this.parent().save(callback)
});

AnswerSchema.method("vote", function(vote, callback){
    vote == "up"? this.vote+=1: this.vote-=1
    this.parent().save(callback)
});

var QuestionSchema = new Schema({
    text: String,
    CreatedAt: {type: Date, default: Date.now},
    answer: [AnswerSchema]

});

QuestionSchema.pre("save", function(next){
   this.answers.sort(sortAnswers)
    next()
});

var Question = mongoose.model("Question", QuestionSchema);

module.exports.Question = Question;