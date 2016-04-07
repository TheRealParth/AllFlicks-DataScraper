/**
 * Created by Parth on 4/6/16.
 */
var Horseman = require('node-horseman');
var horseman = new Horseman({cookiesFile: './cookies.txt',
    loadImages: false,
    ignoreSSLErrors: true,});

horseman
    .viewport(1000,500)
    .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
    .mouseEvent('mousemove', 260, 10)
    .open('http://www.netflix.com/browse')
    .evaluate(function() {
        // Silly example for illustrative purposes.
        return Bluebird.delay(100).return('Hello World');
    })
    .then(function(mesg){
        // Will log 'Hello World' after a roughly 100 ms delay.
        console.log(mesg);
    })
    .screenshot('hello.png')
    .log() // prints out the number of results
    .close();