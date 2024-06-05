const Express = require('express');
const BodyParser = require('body-parser');

const express = Express()
    .use(BodyParser.urlencoded({extended: true}))
    .use(BodyParser.json({limit: '50mb'}));

require('./config/seneca')(express);
const Todo = require('./models/task.model');