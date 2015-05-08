'use strict'

var fs = require('fs')
var Docxtemplater = require('docxtemplater')

var options;


// Function: Read docx file
function readFile(callback) {

  if (!fs.existsSync(options.inputfile)) {
    return callback(new Error(options.inputfile + ' not found'), null);
  }

  var content = fs.readFileSync(options.inputfile,"binary")
  var doc = new Docxtemplater(content);

  if (!doc) {
    return callback(new Error('Cannot open doc content'), null);
  }
  return callback(null, doc);
}

// Function: Sets outputname if unset
function setOutputName() {
  var outputfile = options.inputfile.replace(/\.[^/.]+$/, "") + '-out.docx'
  return outputfile
}

// Function: Creates file
function createFile(doc, callback) {

  // Apply changes
  doc.render();

  // Generate buffer
  var buf = doc.getZip().generate({type:"nodebuffer"});

  // Write buffer to file
  fs.writeFileSync(options.outputfile, buf, 'utf-8', function (err) {
    if (err) {
      return callback(new Error('Error: ' + err), null);
    }
  });
}

// Constructor: Do all the things
function create(opts, callback) {

  options = opts

  if (!options) {
    return callback(new Error('Missing required input: options'), null);
  }

  if (!options.inputfile) {
    return callback(new Error('Missing required input: options.inputfile'), null);
  }

  if (!options.outputfile) {
    options.outputfile = setOutputName()
  }

  if (!options.data) {
    return callback(new Error('Missing required input: options.data'), null);
  }

  readFile(function(err, doc) {
    doc.setData(options.data)
    doc.render();
    createFile(doc, function (err, data) {
      if (err) {
        return callback(new Error('Error: ' + err), null);
      }
      return callback(null, 'File ' + options.outputfile + ' written');
    });
  });
}

// Export the class
module.exports = create;
