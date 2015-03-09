var express = require('express');
var router = express.Router();
var config = require('../_config');
var Dropbox = require('dropbox');


router.get('/', function(req,res){

  // check to make sure there are acess keys
  if (config.appKey && config.appSecret && config.accessToken){

    // create an instance of the client
    var dropboxClient = new Dropbox.Client({
      key: config.appKey,
      secret: config.appSecret,
      token: config.accessToken,
      sandbox: false
    });

    // authenticate
    dropboxClient.authenticate(function(error, client) {
      if (error) {
        console.log(error);
      }
    });

    // get account info
    dropboxClient.getAccountInfo(function(error, accountInfo) {
      if (error) {
        return showError(error);
      }
      res.send("Hello, " + accountInfo.name + "!");
    });

    // show dropbox files
    // dropboxClient.readdir("/", function(error, entries) {
    //   if (error) {
    //     return showError(error);
    //   }
    //   res.send("Your Dropbox contains " + entries.join(", "));
    // });

  } else {
    res.send("Go register an app with Dropbox!");
  }

});

module.exports = router;


