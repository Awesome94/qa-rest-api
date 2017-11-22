// import { Question } from './models';
// import { Error } from 'mongoose';

'use strict';
var express  = require('express'),
router = express.Router(),
Question = require("./models").Question;

//Preloading Questions.
router.param("qID", function(req, res, next, id){
    Question.findById(qID, function(err, doc){
        if(err) return next(err);
        if(!doc){
            err = new Error("Not found")
            err.status = 404;
            return next(err);
        }
        res.question = doc;
        return next()
    });
});

// preloading Answers
router.param("aID", function(req, res, next, id){
    req.answer = req.question.answers.id(id);
        if(!req.answer){
            err = new Error("Not Found")
            res.status = 404;
            return next(err)
        };
        next();
});

router.get('/', function(req, res, next){
    Question.find({},  null, {sort:{CreatedAt:-1}}, function(err, questions){
        if (err) return next(err);
        res.json(questions);
    });
});

router.post('/', function(req, res, next){
    var question = new Question(req.body);
    question.save(function(err){
        if(err) return next(err);
        res.status(201);
    });
});

router.get('/:qID', function(req, res, next){
        res.json(req.question);
});

router.post('/:qID/answers', function(req, res, next){
    req.question.answers.push(req.body);
    req.question.save(function(err){
        if (err) return next(err);
        res.status = 201;
        res.json(question);
    });
});

router.put('/:qID/answer/:aID', function(req, res, next){
    req.answer.update(req.body, function(err){
        if (err){
            return next(err);
        }
        res.json(result);
    });
});

router.delete('/:qID/answer/:aID', function(req, res, next){
    req.answer.remove(function(err){
        res.question.save(function(){
        if(err) return next (err);
        res.json(question);
        });
    });
});

router.post('/qID/answer/aID/vote-:dir', function(req, res, next){
    if(req.params.dir.search(/^(up|down)$/) === -1){
        var err = new Error("Not found");
        err.status = 404;
        next(err);
    }else{
        req.vote = req.params.dir;
        next();
        }
    },
    function(req, res, next){
        req.answer.vote(req.vote, function(err, question){
        if (err) return next(err);
        res.json(question);
    });
});
    

module.exports = router;