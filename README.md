# tfk-templater

npm install


```javascript
'use strict'

var templater = require('templater')

var options = {
               data:
                 { "navn":"Sverre Tverrtryne",
                   "skolear":"2015/2016",
                   "adresse":"Hestehagen 32b",
                   "postnr":"3211",
                   "sted":"Skien",
                   "avdelingsniva":"avdeling for areal og transport",
                   "dato":"27.03.15"
                 },
               inputfile: "skoleskyss_positivt_vedtak.docx"
}

var result = new templater(options, function (err, data) {
  if (err) {
    console.log(err)
  } else {
    console.log(result)
  }
})
