var casper = require("casper").create({
        viewportSize: {width: 1280, height: 5000},
        clientScripts: [
            'jquery.js',      // These two scripts will be injected in remote
            'underscore.js'   // DOM on every request
        ],
        pageSettings: {
            loadImages: false,        // The WebPage instance used by Casper will
            loadPlugins: true         // use these settings
        },
        logLevel: "info",              // Only "info" level messages will be logged
        verbose: true                  // log messages will be printed out to the console}
    });
var utils =   require('utils');
var mouse = require("mouse").create(casper);
var fs = require('fs');
var Parse = require('parse');
Parse.initialize("7Ls0qDj0lyybWgspTc7kQcYOdy3FQLjGUBzvibph", "0ObHU53Jl2rmlokTkYSeHYuu0ITApIXIbwaxVXkm");
Parse.serverURL = 'http://159.203.108.93:1337/parse';
var obj = new Parse.Object('NetflixTitle');
obj.set('title','test');
obj.save().then(function(obj) {
    console.log(obj);
    var query = new Parse.Query('NetflixTitle');
    query.get(obj.id).then(function(objAgain) {
        console.log(objAgain);
    }, function(err) {console.log(err); });
}, function(err) { console.log(err); });


var titles;
casper.start('https://www.allflicks.net',function(){
    var x = this.evaluate(function() {
            document.getElementsByTagName("th")[5].click();
            var i = document.getElementsByClassName("paginate_button")[document.getElementsByClassName("paginate_button").length -3].innerText;
            return parseInt(i);
        }); // Will be printed in green on
    casper.then(function(){
        var pages = [];
        while(x>0) {
            this.wait(500, function () {
                var page = this.evaluate(function () {
                    var titles = '[';
                    for(var y = 1; y<$("tr").length; y++){
                        // titles += { name:  document.getElementsByTagName("tr")[y].children[1].children[0].innerText,
                        //             image: document.getElementsByTagName("tr")[1].children[0].children[0].href};
                        // var image = document.getElementsByTagName("tr")[1].children[0].children[0].href;

                        titles += '{"name":"' + document.getElementsByTagName("tr")[y].children[1].children[0].innerText + '",';
                        titles += '"image":"' + document.getElementsByTagName("tr")[y].children[0].children[0].children[0].src + '",';
                        titles += '"year":"' + document.getElementsByTagName("tr")[y].children[2].innerText + '",';
                        titles += '"genre":['
                        for(var z = 0; z<document.getElementsByTagName("tr")[y].children[3].innerText.split(",").length; z++){
                            var genre = document.getElementsByTagName("tr")[y].children[3].innerText.split(",")[z];
                            titles += '"' + genre.replace(/\r?\n|\r/g, '') + '"';
                            if(z<(document.getElementsByTagName("tr")[y].children[3].innerText.split(",").length-1)){
                                titles+= ',';
                            }
                        }
                        titles +=  '],';
                        titles += '"rating":"' + document.getElementsByTagName("tr")[y].children[4].innerText + '",';
                        titles += '"dateAdded":"' + document.getElementsByTagName("tr")[y].children[5].innerText + '"}';
                        if(y<($("tr").length-1)){
                            titles+= ',';
                        }

                    }
                    titles += "]";

                    document.getElementsByClassName("paginate_button next")[0].click();


                    return  titles;

                });
                if(x>0){
                    page+= ',';
                }
                fs.write('stuff.js', page, 'a');
                utils.dump(page);

            });
            x--;
        }
    });
});



casper.run();