var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var fileFilter = require('./file-filter');

function SeedInfo(folder){

  function nameMatch(n, f){
    return (n + '.json' === f) || (n + '.json.ejs' === f);
  }
  var documentPerLine = nameMatch.bind(this, 'document-per-line');

  var list = nameMatch.bind(this, 'list');

  function getFormat(){
    var files = _.filter(fs.readdirSync(folder), function(f) {
      return fileFilter.json(f) || fileFilter.jsonEjs(f);
    });

    console.log('[seed-info] files: ', files);

    if(files.length === 0){
      return 'empty';
    } else if(files.length === 1){
      if(list(files[0])){
        return 'list';
      } else if(documentPerLine(files[0])){
        return 'document-per-line';
      } else {
        return 'normal';
      }
    } else if(files.length > 1){

      var listOrDocPerLinePresent = _.filter(files, function(f){
        return documentPerLine(f) || list(f);
      }).length > 0;

      if(listOrDocPerLinePresent){
        throw new Error('[mongo-seeder] - there are multiple files but one of them is called list or document-per-line. Remove these files');
      }
      return 'normal'
    }
  }

  this.path = folder;
  this.format = getFormat();
  this.collectionName = path.basename(folder);
}

function SeedReader(folder){


  this.info = function(){

    var folders = _.filter(fs.readdirSync(folder), function(f) {
      return fs.lstatSync(path.join(folder, f)).isDirectory();
    });

    function toInfo(f){
      return new SeedInfo(path.join(folder, f));
    }

    return _.map(folders, toInfo);
  }

}

module.exports = SeedReader;
