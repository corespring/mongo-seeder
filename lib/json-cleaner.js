var ejs = require('ejs');
var wrench = require('wrench');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var fileFilter = require('./file-filter');

function JsonCleaner(folder){

  this.run = function(){
    var files = _.map(wrench.readdirSyncRecursive(folder), function(f){return path.join(folder, f);} );
    var ejsFiles =  _.filter(files, fileFilter.ejs);
    var jsonFiles = _.filter(files, fileFilter.json);

    _.forEach(jsonFiles, function(f){
      var deleteFile = _.contains(ejsFiles, f + '.ejs');
      if(deleteFile){
        console.log('[json-cleaner] delete', f);
        fs.unlinkSync(f);
      }
    });
  }
}

module.exports = JsonCleaner;
