'use strict';

var fs = require('fs');
var Docxtemplater = require('docxtemplater');
var async = require('async');
var validateOptions = require('./lib/validateOptions');

var options;
var content;
var doc;
var buf;

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
      validateOptions,
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
