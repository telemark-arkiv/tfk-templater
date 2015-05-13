'use strict';

var fs = require('fs');
var Docxtemplater = require('docxtemplater');
var async = require('async');

var options;
var content;
var doc;
var buf;

// Function: Check if all options are set
function checkOpts(callback) {
  if (!options) {
    return callback('Missing required input: options', null);
  }

  if (!options.inputfile) {
    return callback('Missing required input: options.inputfile', null);
  }

  if (!options.outputfile) {
    return callback('Missing required input: options.outputfile', null);
  }

  if (!options.data) {
    return callback('Missing required input: options.data', null);
  }
  return callback();
}

// Function: Read docx file
function readFile(callback) {
  content = fs.readFileSync(options.inputfile, 'binary', function(err, res) {
    if (err) {
      return callback(err, null);
    }
  });
  return callback();
}

// Function: Load Template
function templater(callback) {
  doc = new Docxtemplater(content,  function(err, res) {
    if (err) {
      return callback(err, null);
    }
  });
  return callback();
}

// Function: fills in data in template
function setDocData(callback) {
  doc.setData(options.data, function(err) {
    if (err) {
      return callback(err, null);
    }
  });
  return callback();
}

// Function: Render document
function renderDoc(callback) {
  doc.render(function(err) {
    if (err) {
      return callback(err, null);
    }
  });
  return callback();
}

// Function: Generate doc buffer
function generateBuffer(callback) {
  buf = doc.getZip().generate({type:'nodebuffer'}, function(err, buf) {
    if (err) {
      return callback(err, null);
    }
  });
  return callback();
}

// Function: Write finished document
function writeFile(callback) {
  fs.writeFileSync(options.outputfile, buf, 'utf-8', function(err) {
    if (err) {
      return callback(err, null);
    }
  });
  return callback('Wrote file ' + options.outputfile);
}

// Constructor: Do all the things
function create(opts, callback) {

  opts.files.forEach(function(arr) {
    options = arr;
    async.series([
      checkOpts,
      readFile,
      templater,
      setDocData,
      renderDoc,
      generateBuffer,
      writeFile
    ], function(err, res) {
      if (err) {
        console.error(err);
      }
    });
  });
}

// Export the class
module.exports = create;
