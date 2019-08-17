var express = require('express');
var router = express.Router();
var sharp = require('sharp');

var printer = require("printer");
var filename = 'merge_1.emf'
router.get('/', function(req, res, next) {
    res.render('printer', { title: 'Printers', printername: printer.getDefaultPrinterName(), printersupformat:printer.getSupportedPrintFormats(printer.getDefaultPrinterName()),printerpapersize:"Not Support",printerjobcommand:printer.getSupportedJobCommands(),prninterdriveroptons:"Not Support"});
    console.log(printer.getPrinter(printer.getDefaultPrinterName()));

  });
router.get('/printpic', function(req, res, next) {
    console.log('platform:', process.platform);
    console.log('try to print file: ' + filename);
    sharp('merge_1.png')
      .raw()
      .toBuffer()
      .then(function(outputBuffer) {
          // not yet implemented, use printDirect and text
          var fs = require('fs');
          printer.printDirect({
            data:"p",
            type:'TEXT',
            printer:printer.getDefaultPrinterName(),
            success:function(jobID){
              console.log("sent to printer with ID: "+jobID);
              res.send('Printed <a href="../printers" title="Back">Back</a>');
            },
            error:function(err){
              console.log(err);
              res.send('Print Failed <a href="../printers" title="Back">Back</a>');
            }
          });
        
      });
    
   

  });

module.exports = router;