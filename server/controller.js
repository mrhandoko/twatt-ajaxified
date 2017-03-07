var express = require('express')
var router = express.Router()
var OAuth = require('oauth')
require('dotenv').config()

var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  process.env.TWITTER_CONSUMER_KEY,
  process.env.TWITTER_APPLICATION_SECRET,
  '1.0A',
  null,
  'HMAC-SHA1'
)

module.exports = {
  getSearch: function (req, res, next) {
    oauth.get(
      `https://api.twitter.com/1.1/search/tweets.json?q=${req.body.search}&src=typd`,
      process.env.TWITTER_USER_TOKEN, // test user token
      process.env.TWITTER_USER_SECRET, // test user secret
      function (e, data, respond) {
        if (e) console.error(e)
        res.json(data)
      })
  },
  getTimeline: function (req, res, next) {
    oauth.get(
      // `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=isyanasarasvati`,
      `https://api.twitter.com/1.1/statuses/user_timeline.json`,
      process.env.TWITTER_USER_TOKEN, // test user token
      process.env.TWITTER_USER_SECRET, // test user secret
      function (e, data, respond) {
        if (e) console.error(e)
        res.json(data)
      })
  },
  newTwatt: function (req, res, next) {
    let data = req.body.status
    console.log(data)
    oauth.post(
      // `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=isyanasarasvati`,
      `https://api.twitter.com/1.1/statuses/update.json?status=${data}`,
      process.env.TWITTER_USER_TOKEN, // test user token
      process.env.TWITTER_USER_SECRET, // test user secret
      data,
      'text',
      function (e, data, respond) {
        if (e) console.error(e)
        res.send(data)
      })
  }
}
