# Mongo Seeder

Seed your mongo dbs with support for ejs processing.

# Installation

     {
       "dependencies" : {
         "mongo-seeder" : "~0.0.1"
       }
     }

# Usage

    var seeder = require('mongo-seeder');
    seeder(mongoUri, pathToSeedData, function(err){
      console.log('done');
    });


# Content formats

The content should laid out like so:

    /path/
      collection-one/
        1.json
        2.json.ejs
      collection-two/
        list.json <<-------- not ready yet
      collection-three/
        document-per-line.json


Where the formats are:

* A folder that contains 1 or more json or json.ejs files that are documents to be inserted
* A folder that contains 1 file called list.json (or .json.ejs) - this is an json array where each item in the array is to be inserted
* A folder that contains 1 file called document-per-line.json (or .json.ejs) - this isn't correct json - but it's one of the export formats that `mongoexport` generates. It means that each line is a document.

# Ejs processing

If your seed file has a .json.ejs it will run through the ejs processor. This will expose one function to the template: `read(relativePathToFile)`. This will read the contents of this file into the template.
This is handy if you have some html or xml you want to add but don't want to escape it manually.

