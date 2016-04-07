var casper = require("casper").create({
        viewportSize: {width: 1280, height: 5000},
        clientScripts: [
            'jquery.js',      // These two scripts will be injected in remote
            'underscore.js'   // DOM on every request
        ],
        pageSettings: {
            loadImages: false,        // The WebPage instance used by Casper will
            loadPlugins: false         // use these settings
        },
        logLevel: "debug",              // Only "info" level messages will be logged
        verbose: true                  // log messages will be printed out to the console}
    });
var utils =   require('utils');
var mouse = require("mouse").create(casper);
casper.start('http://www.netflix.com/browse',function(){
    if (this.exists('div.profiles-gate-container')) {
        this.echo(this.evaluate(function() {
            document.getElementsByClassName('profile-link')[0].click();
            return (document.getElementsByClassName('profiles-gate-container').length==0);
        }), 'INFO'); // Will be printed in green on
    }

});
// this.mouse.move(225,40);
// this.mouse.click(225,40);

casper.then(function(){
    if(this.exists('li.browse')){
        this.echo(
            this.evaluate(function(){
                document.getElementsByTagName('a')[1].click();
                
                return document.getElementsByClassName('sub-menu-link')[0].innerText;
        }), 'INFO');

    }
});


casper.run();