var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/createfacultylist', function(request, response) {

var Client = require("./node_modules/github4/lib");
var Tabletop = require('./node_modules/tabletop/src/tabletop.js');
var json2csv = require('json2csv');

var github = new Client({
    debug: true
});

github.authenticate({
    type: "basic",
    username: "vydingding",
    password: "09212391013a"
});

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1Etze7fBNH3j4ss4-LPz_-khYRKnh0w34ScsqaJDvXtE/pubhtml';

var tabletop = Tabletop.init( { key: public_spreadsheet_url, callback: createGeneral, wanted: ["Faculty"], simpleSheet: true} )

  function createGeneral(data, tabletop) {

    var fields = ['FacultyName', 'Age'];    

    json2csv({ data: data, fields: fields }, function(err, csv) {
      if 
      (err) console.log(err);
      data = csv;
    });

    data = new Buffer(data.toString('base64'));
    buff = data.toString('base64');

    github.repos.createFile({
    user: "vydingding",
    repo: "vydingding.github.io",
    path: "_data/GeneralFacultyList.csv",
    message: "Faculty list",
    content: buff
    }, function(err, res) {    

      var contents = "<html><body><h1>This is a general website.</h1><p>This is about all DCS faculty.</p> <h1> Members: </h1><ul>{% for Name in site.data.GeneralFacultyList %}<li>{{ Name.FacultyName }}-{{ Name.Age }}</li>{% endfor %}</ul></body></html>";
      contents = new Buffer(contents.toString('base64'));
      buffs = contents.toString('base64');


    github.repos.createFile({
    user: "vydingding",
    repo: "vydingding.github.io",
    path: "_posts/GeneralFacultyList.html",
    message: "Faculty list HTML",
    content: buffs       
    }, function(err, res) {
        console.log(err, res);

    var tabletop2 = Tabletop.init( { key: public_spreadsheet_url, callback: showInfo, wanted: ["Faculty"], simpleSheet: true } )

    function showInfo(data, tabletop2) {

    var fields = ['FacultyName'];
    var facultyArray = [];

    for(var i = 0; i < data.length; i++){
      facultyArray.push(data[i].FacultyName);
    }

    function createmany(facultyArr) {

    var sheetctr = 0;
    var content = "<html><body><h1> " + facultyArr[0] + "</h1><p>This is about me.</p> <h1> PUBLICATIONS: </h1><ul>{% for Name in site.data.JJ Lumagbas %}<li>{{ JJ Lumagbas.Name }}-{{ JJ Lumagbas.Published }}</li>{% endfor %}</ul></body></html>";
    content = new Buffer(content.toString('base64'));
    newcontent = content.toString('base64');

      if (facultyArr.length > 0) {

        console.log("*******FACULTY ARR 0 NAME: " + facultyArr[0]);

          github.repos.createFile({
            user: "vydingding",
            repo: "vydingding.github.io",
            path: "_posts/" + facultyArr[0] + ".html",
            message: "Individual faculty",
            content: newcontent
          }, function(err, res) {

              if (err) console.log(err);

                var tabletop3 = Tabletop.init( { key: public_spreadsheet_url, callback: showInfo2, wanted: [facultyArr[0]], simpleSheet: true } )
                
                function showInfo2(data, tabletop3) {

                   var fields = ["Name", "Published"];

                    json2csv({ data: data, fields: fields }, function(err, csv) {
                    if 
                    (err) console.log(err);
                    data = csv;
                    });

                    data = new Buffer(data.toString('base64'));
                    buff = data.toString('base64');  

                      github.repos.createFile({
                      user: "vydingding",
                      repo: "vydingding.github.io",
                      path: "_data/" + tabletop3.model_names[sheetctr] + ".csv",
                      message: "Individual faculty",
                      content: buff

                    }, function(err, res) {

                      sheetctr++;
                    });
                }


              facultyArr.splice(0, 1);
              createmany(facultyArr);
          });
      }
    }
    createmany(facultyArray);
   }

    });

    });

  }

response.json({ message: 'Faculty list created!' });   
 });



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


app.get('/updatefacultylist', function(request, response) {

var Client = require("./node_modules/github4/lib");
var Tabletop = require('./node_modules/tabletop/src/tabletop.js');
//var testAuth = require("./../test_auth.json");
var json2csv = require('json2csv');

var github = new Client({
    debug: true
});

github.authenticate({
    type: "basic",
    username: "vydingding",
    password: "09212391013a"
});

var pastfile = "";

  github.repos.getContent({

    user: "vydingding",
    repo: "vydingding.github.io",
    path: "_data/GeneralFacultyList.csv"
    }, function(err, res) {
    pastfile = res.sha;

    var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1Etze7fBNH3j4ss4-LPz_-khYRKnh0w34ScsqaJDvXtE/pubhtml';
    var tabletop = Tabletop.init( { key: public_spreadsheet_url, callback: showInfo, wanted:["Faculty"], simpleSheet: true } )

    function showInfo(data, tabletop) {

    var fields = ['FacultyName', 'Age'];

    json2csv({ data: data, fields: fields }, function(err, csv) {
      if 
      (err) console.log(err);
      data = csv;
    });

    data = new Buffer(data.toString('base64'));
    buff = data.toString('base64');

    github.repos.updateFile({

    user: "vydingding",
    repo: "vydingding.github.io",
    path: "_data/GeneralFacultyList.csv",
    message: "JJ change 2",
    content: buff,
    sha: pastfile
    }, function(err, res) {


    var tabletop2 = Tabletop.init( { key: public_spreadsheet_url, callback: showInfo, wanted: ["Faculty"], simpleSheet: true } )

    function showInfo(data, tabletop2) {

    var fields = ['FacultyName'];
    var facultyArray = [];
    var ageArray = []; //sudlan ug age, ibutang sa content, and lesgo

    for(var i = 0; i < data.length; i++){
      facultyArray.push(data[i].FacultyName);
      ageArray.push(data[i].Age);
    }      

    function updatemany(facultyArr, ageArr) {

    var sheetctr = 0;
    var pastindi = "";

    github.repos.getContent({

    user: "vydingding",
    repo: "vydingding.github.io",
    path: "_posts/" + facultyArr[0] + ".html"
    }, function(err, res) {
      
    console.log("********DATA: ", res);  
    pastindi = res.sha;

    var content = "<html><body><h1> " + facultyArr[0] + "</h1><p>This is about me.</p>" +  "I am " + ageArr[0] + "<h1> PUBLICATIONS: </h1><ul>{% for Name in site.data.JJ Lumagbas %}<li>{{ JJ Lumagbas.Name }}-{{ JJ Lumagbas.Published }}</li>{% endfor %}</ul></body></html>";
    content = new Buffer(content.toString('base64'));
    newcontent = content.toString('base64');

      if (facultyArr.length > 0) {

          github.repos.updateFile({
            user: "vydingding",
            repo: "vydingding.github.io",
            path: "_posts/" + facultyArr[0] + ".html",
            message: "Updated faculty info",
            content: newcontent,
            sha: pastindi
          }, function(err, res) {

              if (err) console.log(err);

          github.repos.getContent({

          user: "vydingding",
          repo: "vydingding.github.io",
          path: "_data/" + facultyArr[0] + ".csv"
          }, function(err, res) {

          pastindi = res.sha;

          console.log("*******UPDATING CSV OF: " + facultyArr[0]);
               
                var tabletop3 = Tabletop.init( { key: public_spreadsheet_url, callback: showInfo2, wanted: [facultyArr[0]], simpleSheet: true } )
                
                function showInfo2(data, tabletop3) {

                   var fields = ["Name", "Published"];

                    json2csv({ data: data, fields: fields }, function(err, csv) {
                    if 
                    (err) console.log(err);
                    data = csv;
                    });

                    data = new Buffer(data.toString('base64'));
                    buff = data.toString('base64');  

                      github.repos.updateFile({
                      user: "vydingding",
                      repo: "vydingding.github.io",
                      path: "_data/" + tabletop3.model_names[sheetctr] + ".csv",
                      message: "Updates publication CSV",
                      content: buff,
                      sha: pastindi

                    }, function(err, res) {
                      sheetctr++;

                      facultyArr.splice(0, 1);
                      ageArr.splice(0,1);
                      updatemany(facultyArr, ageArr);
                    });
                }


          });

          });
          
          } 

         });      

        }

        updatemany(facultyArray, ageArray); 



    }
    });

    }

    });


response.json({ message: 'Updating of files successful!' });   
});

app.get('/deletefacultylist', function(request, response) {

var Client = require("./node_modules/github4/lib");
var Tabletop = require('./node_modules/tabletop/src/tabletop.js');
//var testAuth = require("./../test_auth.json");
var json2csv = require('json2csv');

var github = new Client({
    debug: true
});

github.authenticate({
    type: "basic",
    username: "vydingding",
    password: "09212391013a"
});

var pastfile = "";

    var tabletop2 = Tabletop.init( { key: public_spreadsheet_url, callback: showInfo, wanted: ["Faculty"], simpleSheet: true } )

    function showInfo(data, tabletop2) {

    var fields = ['FacultyName'];
    var facultyArray = [];
    var ageArray = []; //sudlan ug age, ibutang sa content, and lesgo

    for(var i = 0; i < data.length; i++){
      facultyArray.push(data[i].FacultyName);
      ageArray.push(data[i].Age);
    }      

    function deletemany(facultyArr, ageArr) {

    var sheetctr = 0;
    var pastindi = "";

    github.repos.getContent({

    user: "vydingding",
    repo: "vydingding.github.io",
    path: "_posts/" + facultyArr[0] + ".html"
    }, function(err, res) {
      
    console.log("********DATA: ", res);  
    pastindi = res.sha;

    var content = "<html><body><h1> " + facultyArr[0] + "</h1><p>This is about me.</p>" +  "I am " + ageArr[0] + "<h1> PUBLICATIONS: </h1><ul>{% for Name in site.data.JJ Lumagbas %}<li>{{ JJ Lumagbas.Name }}-{{ JJ Lumagbas.Published }}</li>{% endfor %}</ul></body></html>";
    content = new Buffer(content.toString('base64'));
    newcontent = content.toString('base64');

      if (facultyArr.length > 0) {

          github.repos.updateFile({
            user: "vydingding",
            repo: "vydingding.github.io",
            path: "_posts/" + facultyArr[0] + ".html",
            message: "Updated faculty info",
            content: newcontent,
            sha: pastindi
          }, function(err, res) {

          github.repos.getContent({

          user: "vydingding",
          repo: "vydingding.github.io",
          path: "_data/" + facultyArr[0] + ".csv"
          }, function(err, res) {

          pastindi = res.sha;

          console.log("*******UPDATING CSV OF: " + facultyArr[0]);
               
                var tabletop3 = Tabletop.init( { key: public_spreadsheet_url, callback: showInfo2, wanted: [facultyArr[0]], simpleSheet: true } )
                
                function showInfo2(data, tabletop3) {

                   var fields = ["Name", "Published"];

                    json2csv({ data: data, fields: fields }, function(err, csv) {
                    if 
                    (err) console.log(err);
                    data = csv;
                    });

                    data = new Buffer(data.toString('base64'));
                    buff = data.toString('base64');  

                      github.repos.updateFile({
                      user: "vydingding",
                      repo: "vydingding.github.io",
                      path: "_data/" + tabletop3.model_names[sheetctr] + ".csv",
                      message: "Updates publication CSV",
                      content: buff,
                      sha: pastindi

                    }, function(err, res) {
                      sheetctr++;
                      facultyArr.splice(0, 1);
                      ageArr.splice(0,1);
                      updatemany(facultyArr, ageArr);
                    });
                }

          });

          });
          
          } 

         });      

        }

        updatemany(facultyArray, ageArray); 
    }


response.json({ message: 'Delete file successful!' });   
});



app.get('/test', function(request, response) {

var Client = require("./node_modules/github4/lib");
var Tabletop = require('./node_modules/tabletop/src/tabletop.js');
//var testAuth = require("./../test_auth.json");
var json2csv = require('json2csv');

var github = new Client({
    debug: true
});

github.authenticate({
    type: "basic",
    username: "vydingding",
    password: "09212391013a"
});


//if data[i].name kay gaexist, nothing then if -1, deletefile

github.repos.getContent({

          user: "vydingding",
          repo: "vydingding.github.io",
          path: "_data/GeneralFacultyList.csv"
          }, function(err, res) {


           // console.log("*****DATA: ", res[1].name);

            var stringified = JSON.stringify(res);
            var b64string = res.content;
            var buff = new Buffer(b64string, 'base64');
            var stringified = buff.toString();

              github.repos.getContent({

              user: "vydingding",
              repo: "vydingding.github.io",
              path: "_posts"
              }, function(err, res) {   

                for(var i = 0; i < res.length; i++){

                var filename = res[i].name;
                filename = filename.substring(0, (filename.length - 5));  

                  if(stringified.search(filename) != -1 || filename == "GeneralFacultyList"){
                    console.log("Number " + i +  "," + filename + ": FOUND!\n" + stringified.search(filename));
                  }

                  else{
                    console.log(filename + " is not found! It will be deleted.");

                      github.repos.deleteFile({

                      user: "vydingding",
                      repo: "vydingding.github.io",
                      path: "_posts/" + filename + ".html",
                      message: "Deleted " + filename + ".html",
                      sha: res[i].sha
                      }, function(err, ress) { 

                      });

                      github.repos.getContent({

                                user: "vydingding",
                                repo: "vydingding.github.io",
                                path: "_data/" + filename + ".csv"
                      }, function(err, res) {

                      github.repos.deleteFile({

                      user: "vydingding",
                      repo: "vydingding.github.io",
                      path: "_posts/" + filename + ".html",
                      message: "Deleted " + filename + ".html",
                      sha: res.sha
                      }, function(err, ress) { 

                      });

                    });
                  }
                }

              });       

         });



response.json({ message: 'Test successful!' });   
});