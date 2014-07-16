var SeedReader = require('../lib/seed-reader');
var path = require('path');
var should = require('should');

describe('seed-reader', function(){

  it('should', function(){
    var reader = new SeedReader( path.resolve(__dirname, './mock-data'));
    var info = reader.info();
    info.should.be.ok
    info.length.should.eql(2);
    info[0].collectionName.should.eql('standards');
  });
});
