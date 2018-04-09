var cheerio = require("cheerio");
var request = require("request");
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var db = require("./models");

var app = express();

var PORT = process.env.PORT || 3000;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoscraper";

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static("public"));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Routes

// home page
app.get('/', function(req, res) {

  res.render('home')
});

// get saved articles
app.get('/saved', function(req, res) {

});
// shows scraped articles
app.get('/articles', function(req, res) {
  db.Article.find({})
  .then(function(dbArticle) {
    res.render('home', {articles: dbArticle})
  })
  .catch(function(err) {
    res.json(err);
  })
});

// scrapes articles from web and adds to db
app.get("/scrape", function(req, res) {
  request("http://www.espn.com/nba/", function(error, response, html) {

    var $ = cheerio.load(html);

    // An empty object to save the scraped data
    var articleObj = {};

    $("a.contentItem__padding").each(function(i, element) {

      // save title and link to object
      articleObj.title = $(element).children("div").children("h1").text();
      articleObj.link = "http://www.espn.com" + $(element).attr("href");
      articleObj.subhead = $(element).children("div").children("p").text();

      // insert data into articles collection
      db.Article.create(articleObj)
      .then(function(dbArticle) {
      })
      .catch(function(err) {
      });
      console.log(articleObj)

    });
     res.redirect('/articles')
  });
});


// save an article

// unsave article

// all saved articles

// mongoose.connection.on("error", function(error) {
//   console.log("Database Error:", error);
// });

app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
