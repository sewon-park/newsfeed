var request = require("request")
var cheerio = require("cheerio")

var scrape = function (cb) {
  request("https://www.nytimes.com/", function (err, res, body) {
    var $ = cheerio.load(body);
    var result = [];
    $("article").each(function (i, element) {

      var head = $(element).children().text();
      var sum = $(element).find("p").text();
      var link = $(element).find("a").attr("href");


      result.push({
        headline: head,
        summary: sum,
        url: link
      })
    })
    cb(reuslt)
  })
};

module.exports = scrape;