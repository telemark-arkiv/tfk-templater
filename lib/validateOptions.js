'use strict';

/**
 * Validates the options object
 * @module
 * @param {object} options - Option object
 * @param {string} options.inputfile - Path to the inputfile
 * @param {string} options.outputfil - Path to the outputfile
 * @param {object} options.data - Path to the outputfile
 * @param {callback} callback - The response callback
 * @returns {*}
 */
function validateOptions(options, callback) {
  if (!options) {
    return callback(new Error('Missing required input: options'), null);
  }

  if (!options.inputfile) {
    return callback(new Error('Missing required input: options.inputfile'), null);
  }

  if (!options.outputfile) {
    return callback(new Error('Missing required input: options.outputfile'), null);
  }

  if (!options.data) {
    return callback(new Error('Missing required input: options.data'), null);
  }
  return callback(null, {'status':'ok'});
}

module.exports = validateOptions;
