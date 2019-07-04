//Bring in scrape script and makeDate script
var scrape = require("../scripts/scrape");
var makeDate = require ("../scripts/date");

//Bring in Headline and Note mongoose models
var Headline = require("../models/Headline");

module.exports = {
  //fetch run the scrape function. then run mongo function - if error, don't stop but move on the the next article
fetch: function(cb){
  scrape(function(data){
    var result = data;
    for (var i = 0; i < result.length; i++){
      result[i].date = makeDate();
      result[i].saved = false;
    }

    Headline.collection.insertMany(result, {ordered:false}, function(err, docs){
      cb(err, docs)
    })
  })
},
delete: function(query, cb){
  Headline.remove(query,cb);

},

get: function(query, cb){
  Headline.find(query)
  .sort({
    _id:-1
  })
  .exec(function(err,doc){
    cb(doc)
  })

},
update: function(query,cb){
  Headline.update({_id:query._id}, {
    $set:query},
    {}, cb);
  }


}