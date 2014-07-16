var ejs = require('ejs');
var wrench = require('wrench');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var EOL = require('os').EOL;
var fileFilter = require('./file-filter');

function XmlReader(currentPath) {
  var reEOL = new RegExp(EOL, 'g');

  this.read = function(relativePath) {
    var dir, resolvedPath, xml;
    console.log("read: " + currentPath + " --> " + relativePath);
    dir = path.dirname(currentPath);
    resolvedPath = path.join(dir,relativePath);
    console.log("resolved to: " + resolvedPath);
    xml = fs.readFileSync(resolvedPath).toString();
    xml = xml.replace(reEOL, '\\n').replace(/"/g, "\\\"");
    return xml;
  };
}

function JsonPreProcessor(info) {

  console.log('info', info);


  var processEjs = function(p) {
    console.log('[process]', p);
    var cwd = process.cwd();
    var contents = fs.readFileSync(p).toString();
    var rendered = ejs.render(contents, {
      helper: new XmlReader(p)
    });
    savePath = p.replace(".ejs", "");
    return fs.writeFileSync(savePath, rendered);
  };

  var prepare = function(root) {
    var files = fs.readdirSync(root);
    var ejsFiles = _(files)
      .filter(fileFilter.ejs)
      .map( function(f) {
      return path.join(root, f);
    }).value();

    console.log('ejs files: ', ejsFiles);
    _.each(ejsFiles, processEjs);
  };

  this.run = function() {
    _.forEach(info, function(i) {
      prepare(i.path);
    });
  };
}




module.exports = JsonPreProcessor;
