var path = require('path');

function endsWith(suffix, file){
  return path.extname(file) === suffix;
}

module.exports.ejs = endsWith.bind(module, '.ejs');
module.exports.json = endsWith.bind(module, '.json');
module.exports.jsonEjs = function(f) {
  return endsWith('.ejs', f) && endsWith( '.json', path.basename(f, '.ejs'));
}
