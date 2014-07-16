# Mongo Seeder

Seed your mongo dbs.

# Installation

     {
       "dependencies" : {
         "mongo-seeder" : "~0.0.1"
       }
     }

# Usage

    var seeder = require('mongo-seeder');
    seeder(mongoUri, pathToSeedData);


# Content formats

The content should laid out like so:

    /path/
      collection-one/
        1.json
        2.json.ejs
      collection-two/
        list.json
      collection-three/
        document-per-line.json


Where the formats are:

* A folder that contains 1 or more json or json.ejs files that are documents to be inserted
* A folder that contains 1 file called list.json (or .json.ejs) - this is an json array where each item in the array is to be inserted
* A folder that contains 1 file called document-per-line.json (or .json.ejs) - this isn't correct json - but it's one of the export formats that `mongoexport` generates. It means that each line is a document.
