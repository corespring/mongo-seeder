var MongoSeeder = require('./lib/mongo-seeder');
var JsonPreProcessor = require('./lib/json-preprocessor');
var JsonCleaner = require('./lib/json-cleaner');
var SeedReader = require('./lib/seed-reader');

module.exports = function(uri, folder, done){
  var reader = new SeedReader(folder);
  var info = reader.info();
  new JsonPreProcessor(info).run();
  new MongoSeeder(uri, info).run(function(err){
    new JsonCleaner(folder).run();
    done(err);
  });
};
