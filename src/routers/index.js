import express from "express";

const route = express.Router();

route.use('/v1/ping', require('./ping/v1'))

module.exports = route;
