const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/uploads', express.static('uploads'));
    app.use(morgan('dev'));
    app.use(cors());
}