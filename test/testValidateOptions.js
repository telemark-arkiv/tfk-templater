'use strict';

var assert = require('assert');
var validateOptions = require('../lib/validateOptions');

describe('validateOptions', function() {

  it('it requires an options object', function(done) {

    var options = false;

    validateOptions(options, function(err, data) {
      assert.throws(function() {
          if (err) {
            throw err;
          } else {
            console.log(data);
          }
        }, function(err) {
          if ((err instanceof Error) && /Missing required input: options/.test(err)) {
            return true;
          }
        },
        'Unexpected error'
      );
      done();
    });
  });

  it('it requires options.inputfile to exists', function(done) {

    var options = {
      inputfile: false
    };

    validateOptions(options, function(err, data) {
      assert.throws(function() {
          if (err) {
            throw err;
          } else {
            console.log(data);
          }
        }, function(err) {
          if ((err instanceof Error) && /Missing required input: options.inputfile/.test(err)) {
            return true;
          }
        },
        'Unexpected error'
      );
      done();
    });
  });

  it('it requires options.outputfile to exists', function(done) {

    var options = {
      inputfile: true,
      outputfile: false
    };

    validateOptions(options, function(err, data) {
      assert.throws(function() {
          if (err) {
            throw err;
          } else {
            console.log(data);
          }
        }, function(err) {
          if ((err instanceof Error) && /Missing required input: options.outputfile/.test(err)) {
            return true;
          }
        },
        'Unexpected error'
      );
      done();
    });
  });

  it('it requires options.data to exists', function(done) {

    var options = {
      inputfile: true,
      outputfile: true,
      data: false
    };

    validateOptions(options, function(err, data) {
      assert.throws(function() {
          if (err) {
            throw err;
          } else {
            console.log(data);
          }
        }, function(err) {
          if ((err instanceof Error) && /Missing required input: options.data/.test(err)) {
            return true;
          }
        },
        'Unexpected error'
      );
      done();
    });
  });

  it('it returns expected status if ok', function(done) {

    var options = {
      inputfile: true,
      outputfile: true,
      data: true
    };

    validateOptions(options, function(err, data) {
      if (err) {
        console.error(err);
      } else {
        assert.equal(data.status, 'ok');
      }
      done();
    });
  });

});