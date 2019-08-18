var express = require('express');
var router = express.Router();
var sharp = require('sharp');

var printer = require('node-native-printer');

var getdefaultPrinterName=Promise.resolve(printer.defaultPrinterName());
var getCurrentPrinterName=Promise.resolve(printer.getCurrentPrinter());
var PrinterName;
var CurrentPrinterName;
var filename = 'merge_1.png'

router.get('/', function(req, res, next) {
  getdefaultPrinterName.then(function (result) { console.log("PrinterName:"+result); console.log(printer.printerOptions(result));});
  //console.log(printer.printerInfo(PrinterName));
  //getCurrentPrinterName.then(function (result) { console.log("CurrentPrinterName:"+result); CurrentPrintername=result; });
    //console.log("Set Printer"+printer.getCurrentPrinter()+"is OK.");
    //console.log(printer.printerOptions(PrinterName));

    res.render('printer', { title: 'Printers', printername:"", printersupformat:"",printerpapersize:"Not Support",printerjobcommand:"",prninterdriveroptons:""});
  });
router.get('/printpic', function(req, res, next) {
       printer.print('merge_1.png',[{
        "collate": true,
        "color": true,
        "copies": 1,
        "duplex": "Default",
        "landscape": true,
        "paperSize": "",
        "fromPage": 0,
        "toPage": 0
    }]);
    res.send('Printed <a href="../printers" title="Back">Back</a>');
      });
    
   



module.exports = router;