'use strict'

var templater = require('./templater')

var options = {
               data:
                 { "FullName":"Sverre Tverrtryne",
                   "SchoolYear":"2015/2016",
                   "Adress":"Hestehagen 3715 SKIEN",
                   "Date":"27.03.15"
                 },
               inputfile: "input.docx"
}

var result = new templater(options, function (err, data) {
  if (err) {
    console.log(err)
  } else {
    console.log(result)
  }
});
