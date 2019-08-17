var express = require('express');
var router = express.Router();

var printer = require("printer");
var filename = 'merge_1.png'
router.get('/', function(req, res, next) {
    res.render('printer', { title: 'Printers', printername: printer.getDefaultPrinterName(), printersupformat:printer.getSupportedPrintFormats(printer.getDefaultPrinterName()),printerpapersize:printer.getSelectedPaperSize(printer.getDefaultPrinterName()),printerjobcommand:printer.getSupportedJobCommands(),prninterdriveroptons:printer.getPrinterDriverOptions(printer.getDefaultPrinterName())});
    

  });
router.post('/printpic', function(req, res, next) {
    console.log('platform:', process.platform);
    console.log('try to print file: ' + filename);
    console.log(printer.getPrinterDriverOptions(printer.getDefaultPrinterName()));
    if( process.platform != 'win32') {
      printer.printFile({filename:req.body.filename,
        printer: process.env[3], 
        type: 'PNG' ,
        options: {PageSize:'P6x4'},
        success:function(jobID){
          console.log("sent to printer with ID: "+jobID);
          res.send('Printed <a href="../printers" title="Back">Back</a>');
        },
        error:function(err){
          console.log(err);
          res.send('Print Failed <a href="../printers" title="Back">Back</a>');
        }
      });
    } else {
      // not yet implemented, use printDirect and text
      var fs = require('fs');
      printer.printDirect({data:fs.readFileSync(filename),
        printer: process.env[3], // printer name, if missing then will print to default printer
        success:function(jobID){
          console.log("sent to printer with ID: "+jobID);
          res.send('Printed <a href="../printers" title="Back">Back</a>');
        },
        error:function(err){
          console.log(err);
          res.send('Print Failed <a href="../printers" title="Back">Back</a>');
        }
      });
    }
   

  });

module.exports = router;