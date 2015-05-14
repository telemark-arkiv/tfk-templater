'use strict';

var templater = require('./index.js');

var options = {
  files: [
  {
    inputfile: __dirname + '/templates/skoleskyss_positivt_vedtak.docx',
    outputfile: __dirname + '/out/skoleskyss_positivt_vedtak.docx',
    data:
    {
      'navn':'Sverre Tverrtryne',
      'skolear':'2015/2016',
      'folkeregistrertAdresseAdresse':'Hestehagen 32b',
      'avdeling':'avdeling for areal og transport',
      'dato':'27.03.15'
    }
  },
  {
    inputfile: __dirname + '/templates/skoleskyss_kvittering.docx',
    outputfile: __dirname + '/out/skoleskyss_kvittering.docx',
    data: {
      'navn':'Sverre Tverrtryne',
      'skolear':'2015/2016',
      'folkeregistrertAdresseAdresse':'Hestehagen 32b',
      'avdeling':'avdeling for areal og transport',
      'dato':'27.03.15'
    }
  }
  ]
};

var result = new templater(options, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});
