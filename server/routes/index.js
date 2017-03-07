var express = require('express')
var router = express.Router()
var Controller = require('../controller')
var OAuth = require('oauth')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express'})
})

router.post('/', Controller.getSearch)
router.get('/timeline', Controller.getTimeline)
router.post('/new', Controller.newTwatt)

module.exports = router
