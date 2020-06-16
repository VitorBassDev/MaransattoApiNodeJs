const express = require ('express');
const { response } = require('express');
const app = express();

app.use ((request, response, next) => {
    return response.json({
        name: 'Vitor Guedes'
    });
});

module.exports = app;

