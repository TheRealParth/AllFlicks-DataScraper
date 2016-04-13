var phantom = require('phantom');
var fs = require('fs');
var cheerio = require('cheerio');
var address; //set the random proxy here. add '--proxy=52.90.236.143:8083', '--cookies-file=cookies.txt'
var email = "psyrotix@gmail.com";
var password = "lolTroll04";



var login = function(email, password) {
    phantom.create(['--ignore-ssl-errors=yes', '--load-images=no', '--proxy=52.90.69.217:8083', '--cookies-file=cookies.txt']).then(function (ph) {
        ph.createPage().then(function (page) {
            var isSuccess=false;
            page.property('onResourceRequested', function (requestData, networkRequest) {
                console.log(requestData.url);
                if (requestData.url.indexOf("css") > -1) {
                    networkRequest.abort();
                }
                if (requestData.url.indexOf("facebook") > -1) {
                    networkRequest.abort();
                }
                if (requestData.url.indexOf("browse") > -1) {
                    isSuccess = true;
                }
            });
            page.property('onLoadFinished', function (status) {
                if (isSuccess && (status == 'success')) {
                    for(var i in this.cookies){
                        ph.addCookie(this.cookies[i]);
                        console.log(this.cookies(i));
                    }
                    page.close();
                    console.log(isSuccess);
                }
            });
            page.property('onUrlChanged', function (targetUrl) {
                console.log("URL changed to: " + targetUrl);
                if (targetURL == "https://www.netflix.com/browse") {
                    isSuccess = true;
                }
                fs.appendFile('BrowsePage.txt', this.content, function (err){
                    if (err) throw err;
                    console.log('The "data to append" was appended to file!');
                });

            });
            page.open('https://www.netflix.com/login?locale=en-US').then(function (status) {
                if (status !== 'success') {
                    console.log("failed connection")
                }
                else {
                        page.evaluate(function () {
                                if(document.getElementById('email')) {
                                    document.getElementById('email').value = arguments[0];
                                    document.getElementById('password').value = arguments[1];
                                    document.getElementsByTagName('button')[0].click();
                                }
                                if (document.getElementsByClassName("profiles-gate-container").length > 0) {
                                    document.getElementsByClassName("profile-icon")[0].click();
                                }

                        }, email, password, isSuccess);
                    

                }
                
            });
        });
    });
}

var getLinks = function(){
    phantom.create(['--ignore-ssl-errors=yes', '--load-images=no', '--cookies-file=cookies.txt']).then(function (ph) {
        ph.createPage().then(function (page) {
            page.property('onResourceRequested', function (requestData, networkRequest) {
                // if (requestData.url.indexOf("css") > -1) {
                //     networkRequest.abort();
                // }
                // if (requestData.url.indexOf("facebook") > -1) {
                //     networkRequest.abort();
                // }
            });
            var writeToFile = function(data){fs.writeFileSync('./stuff.js', data);}
            page.setting('javascriptEnabled', true);
            page.property('viewportSize', {width: 1000, height: 800}).then(function() {
            });
            page.property('onLoadFinished', function (status) {

                    this.evaluate(function(){
                            document.getElementsByTagName('a')[1].click();
                            document.getElementsByClassName('sub-menu');

                    });
            });

            page.property('onUrlChanged', function (targetUrl) {
                console.log("URL changed to: " + targetUrl);
            });

            page.open('https://www.netflix.com/browse').then(function (status) {
                if (status !== 'success') {
                    console.log("failed connection");
                }
                else {
                    page.evaluate(function(){
                        if(document.getElementsByClassName('profiles-gate-container').length > 0){
                            document.getElementsByClassName("profile-link")[0].click();
                        }
                        page.onLoadFinished();

                    })
                    fs.writeFile('stuff.js', this.content, function(err){
                        if (err) throw err;
                        console.log('It\'s saved!');
                    });

                }

            });
            page.render('page.png');
            // page.render('page.png');
        // page.close();
        // ph.exit();
        });
    });
}
login(email,password);
// getLinks();