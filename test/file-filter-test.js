var fileFilter = require('../lib/file-filter');
var should = require('should');

describe('file-filter', function(){

  it('should work', function(){
    fileFilter.json('apple.json').should.eql(true);
    fileFilter.json('apple.jsonn').should.eql(false);
  });

  it('should work for json.ejs', function(){
    fileFilter.jsonEjs('apple.json.ejs').should.eql(true);
    fileFilter.jsonEjs('apple.json.ej').should.eql(false);
  });
});
