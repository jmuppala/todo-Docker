const express = require('express');
const mongoose = require('mongoose');

const Todos = require('../models/Todos');

const todoRouter = express.Router();

todoRouter.route('/')
.get((req,res,next) => {
    Todos.find(req.query)
    .then((todos) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(todos);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Todos.create(req.body)
    .then((todos) => {
        console.log('Todos Created ', todos);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(todos);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /todos');
})
.delete((req, res, next) => {
    Todos.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

todoRouter.route('/:todoId')
.get((req,res,next) => {
    Todos.findById(req.params.todoId)
    .then((todo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(todo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /Promotions/'+ req.params.promoId);
})
.put((req, res, next) => {
    Todos.findByIdAndUpdate(req.params.todoId, {
        $set: req.body
    }, { new: true })
    .then((todo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(todo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Todos.findByIdAndRemove(req.params.todoId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = todoRouter;