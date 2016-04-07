var url = "https://www.netflix.com/login";
var page = require('webpage').create();
var webserver = require('webserver');
var server = webserver.create();
var service = server.listen(8080, function(request, response) {
    response.statusCode = 200;
    response.write('<html><body>Hello!</body></html>');
    response.close();
});
console.log('The default user agent is ' + page.settings.userAgent);
page.settings.autoLoadImages = false;
page.settings.localToRemoteUrlAccessEnabled = true;
page.settings.diskCacheEnabled = true;
page.settings.ignoreSslErrors = true;
page.settings.cookiesFile = "cookies.txt";
page.settings.view
page.onResourceRequested = function(request, req) {
    if((request.url.indexOf("css") > -1) == true){
        req.abort();
    }
};
page.onLoadFinished = function(){

}
page.onResourceReceived = function(response, res) {

    // console.log('Receive ' + JSON.stringify(response, undefined, 4));

};
page.onLoadFinished = function(status){
    page.render("nextPage.png");
    setTimeout(console.log("load finished"),500);
};
page.onUrlChanged = function(url){
    console.log("url changed", url);
        };
page.open(url, function(status) {
    if (status !== 'success') {
        console.log('Unable to access network');
    } else {
        page.mouseEvent('mousemove', 260, 10);
        page.evaluate(function() {

            //
            // document.getElementById("login-form-contBtn").click();
            // setTimeout(, 2000);
        });

    }

});
