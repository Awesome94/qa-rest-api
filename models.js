'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema

var sortAnswers = function(a, b){
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

AnswerSchema.method("update", function(updates, callback) {
	Object.assign(this, updates, {updatedAt: new Date()});
    
    this.parent().save(callback);
});

// AnswerSchema.method("update", function(updates, callback){
//     Object.assign(this, updates, {UpdatedAt: new Date()} )
//     this.parent().save(callback)
// });

// AnswerSchema.method("vote", function(vote, callback){
//     if(vote == "up"){
//         this.vote += 1; 
//     } else{
//         this.vote -= 1;
//     }
//     this.parent().save(callback)
// });

AnswerSchema.method("vote", function(vote, callback) {
	if(vote === "up") {
		this.votes += 1;
	} else {
		this.votes -= 1;
    }
    console.log("this is it ")
    console.log("this is it ", this.parent)
    
	(this.parent()).save(callback);
});

var QuestionSchema = new Schema({
    text: String,
    CreatedAt: {type: Date, default: Date.now},
    answers: [AnswerSchema]

});

QuestionSchema.pre("save", function(next){
   this.answers.sort(sortAnswers)
    next()
});

var Question = mongoose.model("Question", QuestionSchema);

module.exports.Question = Question;
