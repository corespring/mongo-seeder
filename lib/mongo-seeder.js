var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var fs = require('fs');
var _ = require('lodash');
var ObjectID = require('mongodb').ObjectID;
var path = require('path');
var EOL = require('os').EOL;
var fileFilter = require('./file-filter');

function MongoSeeder(mongoUri, info){

  this.run = function(done){

    MongoClient.connect(mongoUri, function(err, db) {
      if(err){
        throw err;
      }

      var insertionsCompleted = _.after(info.length, function(err){
        db.close();
        done(err);
      });

      _.forEach(info,  function(i){
        seed(
            db.collection(i.collectionName),
            i.path,
            i.format,
            insertionsCompleted);
      });
    });
  };

  function processId(item) {
    if (item._id.$oid) {
      item._id = item._id.$oid;
    }
    return item;
  }

  function processDates(obj) {
    var key;
    for (key in obj) {
      if (key === "$date") {
        obj = new Date(obj[key]);
      }
      if (obj[key] instanceof Object) {
        obj[key] = processDates(obj[key]);
      }
      if (obj[key] instanceof Array) {
        obj[key] = _.map(obj[key], processDates);
      }
    }
    return obj;
  };

  function getItems(contents, format){
    switch (format) {
      case 'normal':
        json = processDates(JSON.parse(contents));
        json._id = new ObjectID(json._id);
        return [json];
      break;
      case 'document-per-line':
        return contents.trim().split(EOL).map(function(item) {
          return processId(JSON.parse(item.trim()));
        });
      break;
      case 'list':
        throw new Error('list not supported yet');
      break;
      default:
        throw new Error('unknown format', format);
      break;
    }
  }

  var seed = function(collection, folder, format, next) {
    collection.remove({}, function() {

      var files = _.filter(fs.readdirSync(folder), fileFilter.json);

      if(files.length === 0){
        next();
        return;
      }

      var eachInsertionDone = _.after(files.length, function(err){
        console.log('[mongo-seeder] seeding complete - ', collection.collectionName);
        next(err);
      });

      _.each(files, function(f) {
        console.log('seeding: ', path.join(folder,f));

        contents = fs.readFileSync(path.join(folder,f), 'utf8');

        var items = getItems(contents, format);

        collection.insert(items, function(err, docs) {

          collection.find().toArray(function(err, results) {
             eachInsertionDone(err);
          });

        });
      });
    });
  };
}

module.exports = MongoSeeder;
