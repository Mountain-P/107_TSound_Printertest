var express = require('express');
var router = express.Router();
var sharp = require('sharp');





router.get('/', function(req, res, next) {
sharp('input.jpg')
    .resize({
       width:432,
      height: 288
    })
    .composite([{ input: 'overlay.png', gravity: 'southeast' }])
    .sharpen()
    .composite([{ input: 'overlay2.png', gravity: 'southeast' }])
    .sharpen()
    .toFile('output.png')

    
    res.render('imgtest', { title: 'Merge Image' });
});





module.exports = router;