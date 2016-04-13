try {
    var Spooky = require('spooky');
} catch (e) {
    var Spooky = require('../lib/spooky');
}
var Parse = require('parse/node');
Parse.initialize("7Ls0qDj0lyybWgspTc7kQcYOdy3FQLjGUBzvibph", "0ObHU53Jl2rmlokTkYSeHYuu0ITApIXIbwaxVXkm");
// Parse.serverURL = 'http://159.203.108.93:1337/parse';
var fs = require('fs');


var spooky = new Spooky({
    child: {
        transport: 'http'
    },
    casper: {
        loadImages: false,
        logLevel: 'debug',
        verbose: true
    }
}, function (err) {
    if (err) {
        e = new Error('Failed to initialize SpookyJS');
        e.details = err;
        throw e;
    }

    spooky.start('https://www.allflicks.net',function(){
        var x = this.evaluate(function() {
            document.getElementsByTagName("th")[5].click();
            var i = document.getElementsByClassName("paginate_button")[document.getElementsByClassName("paginate_button").length -3].innerText;
            return parseInt(i);
        }); // Will be printed in green on
        this.echo(x, 'INFO');
        this.then(function(){
            var pages = [];
            while(x>0) {
                this.wait(1000, function () {
                    this.then(function(){
                    var page = this.evaluate(function () {
                        var titles = '[';
                        for(var y = 1; y<document.getElementsByTagName("tr").length; y++){
                            // titles += { name:  document.getElementsByTagName("tr")[y].children[1].children[0].innerText,
                            //             image: document.getElementsByTagName("tr")[1].children[0].children[0].href};
                            // var image = document.getElementsByTagName("tr")[1].children[0].children[0].href;

                            titles += '{"name":"' + document.getElementsByTagName("tr")[y].children[1].children[0].innerText + '",';
                            titles += '"image":"' + document.getElementsByTagName("tr")[y].children[0].children[0].children[0].src + '",';
                            titles += '"titleId":"' + document.getElementsByTagName("tr")[y].children[0].children[0].children[0].src.substr(54,8) + '",';
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
                            if(y<(document.getElementsByTagName("tr").length-1)){
                                titles+= ',';
                            }

                        }
                        titles += "]";
                        console.log(titles);
                        document.getElementsByClassName("paginate_button next")[0].click();


                        return  JSON.parse(titles);

                    });
                    // if(x>0){
                    //     page+= ',';
                    // }

                        this.emit('page.done', page);

                    });

                    // fs.write('stuff.js', page, 'a');
                    // this.echo(page, 'INFO');

                });
                x--;
            }
        });
    });
    spooky.run();
});

spooky.on('error', function (e, stack) {
    console.error(e);

    if (stack) {
        console.log(stack);
    }
});

spooky.on('write.page', function(page){

    fs.writeFileSync('stuff.js', ("x: \n" + page), 'a');
});
/*
 // Uncomment this block to see all of the things Casper has to say.
 // There are a lot.
 // He has opinions.
 spooky.on('console', function (line) {
 console.log(line);
 });
 */
spooky.on('title.done', function(title){

});
spooky.on('page.done', function (page) {

    var obj = new Parse.Object.extend('NetflixTitle');
    var titleArray = [];
    for(var title in page){
        var newTitle = new obj();
        newTitle.set('title', page[title].name);
        newTitle.set('titleId', page[title].titleId);
        newTitle.set('lowImg', page[title].image);
        newTitle.set('hiImg', ("https://allflicks-salco.netdna-ssl.com/netflix-images/342x192/" + page[title].titleId + ".jpg"));
        newTitle.set('rating', page[title].rating);
        var genre = [];
        for(var i in page[title].genre){

            switch(page[title].genre[i]){
                case("Thrillers"):
                    genre[i]="4tzcCmd2YU";
                    continue;
                case("Sports Movies"):
                    genre[i]="PkAezsNBV4";
                    continue;
                case("Sci-Fi & Fantasy"):
                    genre[i]="3d0QX3jDk2";
                    continue;
                case("Romantic Movies"):
                    genre[i]="rJquxQgIx5";
                    continue;
                case("Musicals"):
                    genre[i]="WLoZxVLf48";
                    continue;
                case("Music"):
                    genre[i]="WYnxRDPAdj";
                    continue;
                case("International Movies"):
                    genre[i]="F3sITlrW5I";
                    continue;
                case("Independent Movies"):
                    genre[i]="oGrF18QFxX";
                    continue;
                case("Horror Movies"):
                    genre[i]="9RKgAKOIdM";
                    continue;
                case("Gay & Lesbian Movies"):
                    genre[i]="5OVKhP4hGf";
                    continue;
                case("Faith & Spirituality"):
                    genre[i]="5QLfLtGv9l";
                    continue;
                case("Dramas"):
                    genre[i]="mEAcFOx2If";
                    continue;
                case("Documentaries"):
                    genre[i]="Ll67D0RSBA";
                    continue;
                case("Cult Movies"):
                    genre[i]="9wPPX2Fjxx";
                    continue;
                case("Comedies"):
                    genre[i]="mR8OysFSXt";
                    continue;
                case("Classic Movies"):
                    genre[i]="ajX9tKoACq";
                    continue;
                case("Children & Family Movies"):
                    genre[i]="yAqTXokLcF";
                    continue;
                case("Anime"):
                    genre[i]="F0zPwgM7AY";
                    continue;
                case("Action & Adventure"):
                    genre[i]="iDN6tOAzaR";
                    continue;
                case("TV Shows"):
                    genre[i]="RoWhEXfQzy";
                    continue;
                default:
                    genre[i]="nothing";
                    continue;

            }
            // if(i<(page[title].genre.length-1)){
            //     genre+=",";
            // }
        }
        newTitle.set('genre', genre);
        newTitle.set('year', page[title].year);
        newTitle.set('dateAdded', new Date(Date.parse(page[title].dateAdded)));
        titleArray.push(newTitle);
        // while(!setTimeout(function(){
        //     console.log("waiting");
        // },100));
        // var query = new Parse.Query('NetflixTitle');
        // query.get(obj.id).then(function(objAgain) {
        //    if(objAgain){
        //         console.log("already exists");
        //    }else {
        //
        //    };
        // }, function(err) {
        //     if(err.code == 101) {
        //         obj.save().then(function (obj) {
        //             console.log(obj);
        //         }, function (err) {
        //             console.log(err);
        //         });
        //     }
        //     });

        console.log(JSON.stringify(page[title]));
    }
    Parse.Object.saveAll(titleArray, {
        success: function(objs) {
           console.log(objs);
        },
        error: function(error) {
            console.log(error);
        }
    });
});

spooky.on('hello', function (greeting) {
    console.log(greeting);
});

spooky.on('log', function (log) {
    if (log.space === 'remote') {
        console.log(log.message.replace(/ \- .*/, ''));
    }
});
spooky.on('console', function (line) {
    console.log(line);
});