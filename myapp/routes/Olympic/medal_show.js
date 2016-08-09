var request = require('request');
var cherrio = require('cheerio');
var express = require('express');

var router = express.Router();

router.get('/', function (req, res) {
    res.render('Olympic/olympic');
})

module.exports = router;