var express = require('express');
var bodyParser = require('body-parser');
var rp = require('request-promise');
var cheerio = require('cheerio');
var app = express();
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(bodyParser.json());

app.listen(8080, function(req, res) {
   console.log('Listening on port 8080!!!!!!');
});
var stringArr = ["The last person at FSA/GH just left the building...:ghost:", "It's awfully quiet in here", "Where is everyone?", "Peace and quiet...", ":ghost::ghost::ghost:"];
var loudArr = ["https://media4.giphy.com/media/3o7abxJnPpGmW72fO8/giphy.gif Keep it low, BRO!", 
"http://media0.giphy.com/media/3oEjHAWaWTKqLF6K1a/giphy.gif Shhhhhhhhhhhh!!", 
"http://media2.giphy.com/media/6Y7Cf5gV5znBm/giphy.gif 2 feet voices, guys!", 
"http://media1.giphy.com/media/O7FZoSMAgF9f2/giphy.gif No subtle shhhism's", 
"http://media2.giphy.com/media/l41Ye6fgyX5Q37QsM/giphy.gif Is this what they call the bar effect?! Quiet, guys!","http://media0.giphy.com/media/B46OnS3oGxk5y/giphy.gif Shhhhh Angela goshhhhhh :triumph:", 
"https://slack-imgs.com/?c=1&url=https%3A%2F%2Fmedia4.giphy.com%2Fmedia%2Fl41Yg2xuA3ktwe5TG%2F200_s.gif Shhhhh, Nat keep it down.", 
"http://media1.giphy.com/media/43n7h7h3IBqDK/giphy.gif BRUNO KEEP IT DOWN :rage:"];

function randomMessage(arr) {
   var num = Math.floor(Math.random() * arr.length);
   return arr[num];
}

app.post('/', function(req, res, err) {
   var options = {
       method: 'POST',
       uri: 'https://hooks.slack.com/services/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',
       body: {
           text: randomMessage(stringArr) + '  ' + new Date()
       },
       json: true // Automatically stringifies the body to JSON
   };
   rp(options)
       .then(function(parsedBody) {
           res.send();
       })
       .catch(function(err) {
           // POST failed...
       });
});

app.post('/loud', function(req, res, err) {
   var loud = {
       method: 'POST',
       uri: 'https://hooks.slack.com/services/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',
       body: {
           text: randomMessage(loudArr)
       },
       json: true // Automatically stringifies the body to JSON
   };
   rp(loud)
       .then(function(parsedBody) {
           // POST succeeded...
           res.send();
       })
       .catch(function(err) {
           // POST failed...
       });
});