var seed = require('../index');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var should = require('should');
var _ = require('lodash');
var uri = 'mongodb://localhost/mongo-seed-test-db';

describe('mongo-seeder', function(){

  it('should', function(done){
    seed(uri, path.resolve(__dirname, './mock-data'), function(err){
      MongoClient.connect(uri, function(err, db){

        if(err){
          throw new Error(err);
        }


        var assertionsDone = _.after(2, function() {
          console.log('Done saving!');
          done();
        });

        db.collection('things').count(function(err, count){
          count.should.eql(1);
          assertionsDone();
        })

        db.collection('standards').count(function(err, count){
          count.should.eql(2);
          assertionsDone();
        })
      });

    });
  });
});
