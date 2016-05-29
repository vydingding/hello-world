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

var tabletop = Tabletop.init( { key: public_spreadsheet_url, callback: createGeneral, simpleSheet: true } )

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
    path: "_data/faculty.csv",
    message: "Faculty list",
    content: buff
    }, function(err, res) {
        console.log(err, res);

    });
  }

  var tabletop2 = Tabletop.init( { key: public_spreadsheet_url, callback: showInfo, simpleSheet: true } )

    function showInfo(data, tabletop2) {

    var fields = ['FacultyName'];
    var facultyArray = [];

    console.log("Length: " + data.length);


    for(var i = 0; i < data.length; i++){
      facultyArray.push(data[i].FacultyName);
    }

    function createmany(facultyArr) {
      console.log("*********************Length: " + facultyArr.length);
      if (facultyArr.length > 0) {

          github.repos.createFile({
            user: "vydingding",
            repo: "vydingding.github.io",
            path: "_data/" + facultyArr[0] + ".html",
            message: "Individual faculty",
            content: "PCFET0NUWVBFIGh0bWw+DQo8aHRtbD4NCiAgPGhlYWQ+DQogICAgPHRpdGxlPnslIGlmIHBhZ2UudGl0bGUgJX17eyBwYWdlLnRpdGxlIH19IOKAkyB7JSBlbmRpZiAlfXt7IHNpdGUubmFtZSB9fSDigJMge3sgc2l0ZS5kZXNjcmlwdGlvbiB9fTwvdGl0bGU+DQoNCiAgICB7JSBpbmNsdWRlIG1ldGEuaHRtbCAlfQ0KDQogICAgPCEtLVtpZiBsdCBJRSA5XT4NCiAgICAgIDxzY3JpcHQgc3JjPSJodHRwOi8vaHRtbDVzaGl2Lmdvb2dsZWNvZGUuY29tL3N2bi90cnVuay9odG1sNS5qcyI+PC9zY3JpcHQ+DQogICAgPCFbZW5kaWZdLS0+DQoNCiAgICA8bGluayByZWw9InN0eWxlc2hlZXQiIHR5cGU9InRleHQvY3NzIiBocmVmPSJ7eyBzaXRlLmJhc2V1cmwgfX0vc3R5bGUuY3NzIiAvPg0KICAgIDxsaW5rIHJlbD0iYWx0ZXJuYXRlIiB0eXBlPSJhcHBsaWNhdGlvbi9yc3MreG1sIiB0aXRsZT0ie3sgc2l0ZS5uYW1lIH19IC0ge3sgc2l0ZS5kZXNjcmlwdGlvbiB9fSIgaHJlZj0ie3sgc2l0ZS5iYXNldXJsIH19L2ZlZWQueG1sIiAvPg0KDQogICAgPCEtLSBDcmVhdGVkIHdpdGggSmVreWxsIE5vdyAtIGh0dHA6Ly9naXRodWIuY29tL2JhcnJ5Y2xhcmsvamVreWxsLW5vdyAtLT4NCiAgPC9oZWFkPg0KDQogIDxib2R5Pg0KICAgIA0KICAgICAgICBDSEFOR0VEISEhISEhDQogICAgDQogICAgDQogICAgPGRpdiBjbGFzcz0id3JhcHBlci1tYXN0aGVhZCI+DQogICAgICA8ZGl2IGNsYXNzPSJjb250YWluZXIiPg0KICAgICAgICA8aGVhZGVyIGNsYXNzPSJtYXN0aGVhZCBjbGVhcmZpeCI+DQogICAgICAgICAgPGEgaHJlZj0ie3sgc2l0ZS5iYXNldXJsIH19LyIgY2xhc3M9InNpdGUtYXZhdGFyIj48aW1nIHNyYz0ie3sgc2l0ZS5hdmF0YXIgfX0iIC8+PC9hPg0KDQogICAgICAgICAgPGRpdiBjbGFzcz0ic2l0ZS1pbmZvIj4NCiAgICAgICAgICAgIDxoMSBjbGFzcz0ic2l0ZS1uYW1lIj48YSBocmVmPSJ7eyBzaXRlLmJhc2V1cmwgfX0vIj57eyBzaXRlLm5hbWUgfX08L2E+PC9oMT4NCiAgICAgICAgICAgIDxwIGNsYXNzPSJzaXRlLWRlc2NyaXB0aW9uIj57eyBzaXRlLmRlc2NyaXB0aW9uIH19PC9wPg0KICAgICAgICAgIDwvZGl2Pg0KDQogICAgICAgICAgPG5hdj4NCiAgICAgICAgICAgIDxhIGhyZWY9Int7IHNpdGUuYmFzZXVybCB9fS8iPkJsb2c8L2E+DQogICAgICAgICAgICA8YSBocmVmPSJ7eyBzaXRlLmJhc2V1cmwgfX0vYWJvdXQiPkFib3V0PC9hPg0KICAgICAgICAgIDwvbmF2Pg0KICAgICAgICA8L2hlYWRlcj4NCiAgICAgIDwvZGl2Pg0KICAgIDwvZGl2Pg0KDQogICAgPGRpdiBpZD0ibWFpbiIgcm9sZT0ibWFpbiIgY2xhc3M9ImNvbnRhaW5lciI+DQogICAgICB7eyBjb250ZW50IH19DQogICAgPC9kaXY+DQoNCiAgICA8ZGl2IGNsYXNzPSJ3cmFwcGVyLWZvb3RlciI+DQogICAgICA8ZGl2IGNsYXNzPSJjb250YWluZXIiPg0KICAgICAgICA8Zm9vdGVyIGNsYXNzPSJmb290ZXIiPg0KICAgICAgICAgIHslIGluY2x1ZGUgc3ZnLWljb25zLmh0bWwgJX0NCiAgICAgICAgPC9mb290ZXI+DQogICAgICA8L2Rpdj4NCiAgICA8L2Rpdj4NCg0KICAgIHslIGluY2x1ZGUgYW5hbHl0aWNzLmh0bWwgJX0NCiAgICANCg0KICA8L2JvZHk+DQo8L2h0bWw+"
          }, function(err, res) {
              if (err) console.log(err);
              facultyArr.splice(0, 1);
              createmany(facultyArr);
          });
      }

    }
    createmany(facultyArray);
   }

response.json({ message: 'Faculty list created!' });   
});

// app.get('/createfacultylist', function(request, response) {

// var Client = require("./node_modules/github4/lib");
// var Tabletop = require('./node_modules/tabletop/src/tabletop.js');
// var json2csv = require('json2csv');

// var github = new Client({
//     debug: true
// });

// github.authenticate({
//     type: "basic",
//     username: "vydingding",
//     password: "09212391013a"
// });

// var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1Etze7fBNH3j4ss4-LPz_-khYRKnh0w34ScsqaJDvXtE/pubhtml';

// var tabletop = Tabletop.init( { key: public_spreadsheet_url, callback: createGeneral, simpleSheet: true } )

//   function createGeneral(data, tabletop) {

//     var fields = ['FacultyName', 'Age'];    

//     json2csv({ data: data, fields: fields }, function(err, csv) {
//       if 
//       (err) console.log(err);
//       data = csv;
//     });

//     data = new Buffer(data.toString('base64'));
//     buff = data.toString('base64');

//     github.repos.createFile({
//     user: "vydingding",
//     repo: "vydingding.github.io",
//     path: "_data/faculty.csv",
//     message: "Faculty list",
//     content: buff
//     }, function(err, res) {
//         console.log(err, res);

//         var tabletop2 = Tabletop.init( { key: public_spreadsheet_url, callback: showInfo, simpleSheet: true } )

//     function showInfo(data, tabletop2) {

//     var fields = ['FacultyName'];
//     var facultyArray = [];

//     console.log("Length: " + data.length);


//     for(var i = 0; i < data.length; i++){
//       facultyArray.push(data[i].FacultyName);
//     }

//     function createmany(facultyArr) {
//       console.log("*********************Length: " + facultyArr.length);
//       if (facultyArr.length > 0) {

//           github.repos.createFile({
//             user: "vydingding",
//             repo: "vydingding.github.io",
//             path: "_data/" + facultyArr[0] + ".html",
//             message: "Individual faculty",
//             content: "PCFET0NUWVBFIGh0bWw+DQo8aHRtbD4NCiAgPGhlYWQ+DQogICAgPHRpdGxlPnslIGlmIHBhZ2UudGl0bGUgJX17eyBwYWdlLnRpdGxlIH19IOKAkyB7JSBlbmRpZiAlfXt7IHNpdGUubmFtZSB9fSDigJMge3sgc2l0ZS5kZXNjcmlwdGlvbiB9fTwvdGl0bGU+DQoNCiAgICB7JSBpbmNsdWRlIG1ldGEuaHRtbCAlfQ0KDQogICAgPCEtLVtpZiBsdCBJRSA5XT4NCiAgICAgIDxzY3JpcHQgc3JjPSJodHRwOi8vaHRtbDVzaGl2Lmdvb2dsZWNvZGUuY29tL3N2bi90cnVuay9odG1sNS5qcyI+PC9zY3JpcHQ+DQogICAgPCFbZW5kaWZdLS0+DQoNCiAgICA8bGluayByZWw9InN0eWxlc2hlZXQiIHR5cGU9InRleHQvY3NzIiBocmVmPSJ7eyBzaXRlLmJhc2V1cmwgfX0vc3R5bGUuY3NzIiAvPg0KICAgIDxsaW5rIHJlbD0iYWx0ZXJuYXRlIiB0eXBlPSJhcHBsaWNhdGlvbi9yc3MreG1sIiB0aXRsZT0ie3sgc2l0ZS5uYW1lIH19IC0ge3sgc2l0ZS5kZXNjcmlwdGlvbiB9fSIgaHJlZj0ie3sgc2l0ZS5iYXNldXJsIH19L2ZlZWQueG1sIiAvPg0KDQogICAgPCEtLSBDcmVhdGVkIHdpdGggSmVreWxsIE5vdyAtIGh0dHA6Ly9naXRodWIuY29tL2JhcnJ5Y2xhcmsvamVreWxsLW5vdyAtLT4NCiAgPC9oZWFkPg0KDQogIDxib2R5Pg0KICAgIA0KICAgICAgICBDSEFOR0VEISEhISEhDQogICAgDQogICAgDQogICAgPGRpdiBjbGFzcz0id3JhcHBlci1tYXN0aGVhZCI+DQogICAgICA8ZGl2IGNsYXNzPSJjb250YWluZXIiPg0KICAgICAgICA8aGVhZGVyIGNsYXNzPSJtYXN0aGVhZCBjbGVhcmZpeCI+DQogICAgICAgICAgPGEgaHJlZj0ie3sgc2l0ZS5iYXNldXJsIH19LyIgY2xhc3M9InNpdGUtYXZhdGFyIj48aW1nIHNyYz0ie3sgc2l0ZS5hdmF0YXIgfX0iIC8+PC9hPg0KDQogICAgICAgICAgPGRpdiBjbGFzcz0ic2l0ZS1pbmZvIj4NCiAgICAgICAgICAgIDxoMSBjbGFzcz0ic2l0ZS1uYW1lIj48YSBocmVmPSJ7eyBzaXRlLmJhc2V1cmwgfX0vIj57eyBzaXRlLm5hbWUgfX08L2E+PC9oMT4NCiAgICAgICAgICAgIDxwIGNsYXNzPSJzaXRlLWRlc2NyaXB0aW9uIj57eyBzaXRlLmRlc2NyaXB0aW9uIH19PC9wPg0KICAgICAgICAgIDwvZGl2Pg0KDQogICAgICAgICAgPG5hdj4NCiAgICAgICAgICAgIDxhIGhyZWY9Int7IHNpdGUuYmFzZXVybCB9fS8iPkJsb2c8L2E+DQogICAgICAgICAgICA8YSBocmVmPSJ7eyBzaXRlLmJhc2V1cmwgfX0vYWJvdXQiPkFib3V0PC9hPg0KICAgICAgICAgIDwvbmF2Pg0KICAgICAgICA8L2hlYWRlcj4NCiAgICAgIDwvZGl2Pg0KICAgIDwvZGl2Pg0KDQogICAgPGRpdiBpZD0ibWFpbiIgcm9sZT0ibWFpbiIgY2xhc3M9ImNvbnRhaW5lciI+DQogICAgICB7eyBjb250ZW50IH19DQogICAgPC9kaXY+DQoNCiAgICA8ZGl2IGNsYXNzPSJ3cmFwcGVyLWZvb3RlciI+DQogICAgICA8ZGl2IGNsYXNzPSJjb250YWluZXIiPg0KICAgICAgICA8Zm9vdGVyIGNsYXNzPSJmb290ZXIiPg0KICAgICAgICAgIHslIGluY2x1ZGUgc3ZnLWljb25zLmh0bWwgJX0NCiAgICAgICAgPC9mb290ZXI+DQogICAgICA8L2Rpdj4NCiAgICA8L2Rpdj4NCg0KICAgIHslIGluY2x1ZGUgYW5hbHl0aWNzLmh0bWwgJX0NCiAgICANCg0KICA8L2JvZHk+DQo8L2h0bWw+"
//           }, function(err, res) {
//               if (err) console.log(err);
//               facultyArr.splice(0, 1);
//               createmany(facultyArr);
//           });
//       }

//     }
//     createmany(facultyArray);
//    }

//     });
//   }
// response.json({ message: 'Faculty list created!' });   
// });

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
    path: "_data/faculty.csv"
    }, function(err, res) {
    pastfile = res.sha;

    var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1Etze7fBNH3j4ss4-LPz_-khYRKnh0w34ScsqaJDvXtE/pubhtml';
    var tabletop = Tabletop.init( { key: public_spreadsheet_url, callback: showInfo, simpleSheet: true } )

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
    path: "_data/faculty.csv",
    message: "Faculty list change",
    content: buff,
    sha: pastfile
    }, function(err, res) {
    response.json({ message: 'Update file successful!'});   
    });
    }
    });


});

// app.get('/createindividualfaculty', function(request, response) {


// var Client = require("./node_modules/github4/lib");
// var Tabletop = require('./node_modules/tabletop/src/tabletop.js');
// //var testAuth = require("./../test_auth.json");
// var json2csv = require('json2csv');

// var github = new Client({
//     debug: true
// });

// github.authenticate({
//     type: "basic",
//     username: "vydingding",
//     password: "09212391013a"
// });

// // var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1Etze7fBNH3j4ss4-LPz_-khYRKnh0w34ScsqaJDvXtE/pubhtml';
// // var tabletop = Tabletop.init( { key: public_spreadsheet_url, callback: showInfo, simpleSheet: true } )

// //   function showInfo(data, tabletop) {

// //     var fields = ['FacultyName'];
// //     var facultyArray = [];

// //     console.log("Length: " + data.length);


// //     for(var i = 0; i < data.length; i++){
// //       facultyArray.push(data[i].FacultyName);
// //     }

// //     function createmany(facultyArr) {
// //       console.log("*********************Length: " + facultyArr.length);
// //       if (facultyArr.length > 0) {

// //           github.repos.createFile({
// //             user: "vydingding",
// //             repo: "vydingding.github.io",
// //             path: "_data/" + facultyArr[0] + ".html",
// //             message: "Individual faculty",
// //             content: "PCFET0NUWVBFIGh0bWw+DQo8aHRtbD4NCiAgPGhlYWQ+DQogICAgPHRpdGxlPnslIGlmIHBhZ2UudGl0bGUgJX17eyBwYWdlLnRpdGxlIH19IOKAkyB7JSBlbmRpZiAlfXt7IHNpdGUubmFtZSB9fSDigJMge3sgc2l0ZS5kZXNjcmlwdGlvbiB9fTwvdGl0bGU+DQoNCiAgICB7JSBpbmNsdWRlIG1ldGEuaHRtbCAlfQ0KDQogICAgPCEtLVtpZiBsdCBJRSA5XT4NCiAgICAgIDxzY3JpcHQgc3JjPSJodHRwOi8vaHRtbDVzaGl2Lmdvb2dsZWNvZGUuY29tL3N2bi90cnVuay9odG1sNS5qcyI+PC9zY3JpcHQ+DQogICAgPCFbZW5kaWZdLS0+DQoNCiAgICA8bGluayByZWw9InN0eWxlc2hlZXQiIHR5cGU9InRleHQvY3NzIiBocmVmPSJ7eyBzaXRlLmJhc2V1cmwgfX0vc3R5bGUuY3NzIiAvPg0KICAgIDxsaW5rIHJlbD0iYWx0ZXJuYXRlIiB0eXBlPSJhcHBsaWNhdGlvbi9yc3MreG1sIiB0aXRsZT0ie3sgc2l0ZS5uYW1lIH19IC0ge3sgc2l0ZS5kZXNjcmlwdGlvbiB9fSIgaHJlZj0ie3sgc2l0ZS5iYXNldXJsIH19L2ZlZWQueG1sIiAvPg0KDQogICAgPCEtLSBDcmVhdGVkIHdpdGggSmVreWxsIE5vdyAtIGh0dHA6Ly9naXRodWIuY29tL2JhcnJ5Y2xhcmsvamVreWxsLW5vdyAtLT4NCiAgPC9oZWFkPg0KDQogIDxib2R5Pg0KICAgIA0KICAgICAgICBDSEFOR0VEISEhISEhDQogICAgDQogICAgDQogICAgPGRpdiBjbGFzcz0id3JhcHBlci1tYXN0aGVhZCI+DQogICAgICA8ZGl2IGNsYXNzPSJjb250YWluZXIiPg0KICAgICAgICA8aGVhZGVyIGNsYXNzPSJtYXN0aGVhZCBjbGVhcmZpeCI+DQogICAgICAgICAgPGEgaHJlZj0ie3sgc2l0ZS5iYXNldXJsIH19LyIgY2xhc3M9InNpdGUtYXZhdGFyIj48aW1nIHNyYz0ie3sgc2l0ZS5hdmF0YXIgfX0iIC8+PC9hPg0KDQogICAgICAgICAgPGRpdiBjbGFzcz0ic2l0ZS1pbmZvIj4NCiAgICAgICAgICAgIDxoMSBjbGFzcz0ic2l0ZS1uYW1lIj48YSBocmVmPSJ7eyBzaXRlLmJhc2V1cmwgfX0vIj57eyBzaXRlLm5hbWUgfX08L2E+PC9oMT4NCiAgICAgICAgICAgIDxwIGNsYXNzPSJzaXRlLWRlc2NyaXB0aW9uIj57eyBzaXRlLmRlc2NyaXB0aW9uIH19PC9wPg0KICAgICAgICAgIDwvZGl2Pg0KDQogICAgICAgICAgPG5hdj4NCiAgICAgICAgICAgIDxhIGhyZWY9Int7IHNpdGUuYmFzZXVybCB9fS8iPkJsb2c8L2E+DQogICAgICAgICAgICA8YSBocmVmPSJ7eyBzaXRlLmJhc2V1cmwgfX0vYWJvdXQiPkFib3V0PC9hPg0KICAgICAgICAgIDwvbmF2Pg0KICAgICAgICA8L2hlYWRlcj4NCiAgICAgIDwvZGl2Pg0KICAgIDwvZGl2Pg0KDQogICAgPGRpdiBpZD0ibWFpbiIgcm9sZT0ibWFpbiIgY2xhc3M9ImNvbnRhaW5lciI+DQogICAgICB7eyBjb250ZW50IH19DQogICAgPC9kaXY+DQoNCiAgICA8ZGl2IGNsYXNzPSJ3cmFwcGVyLWZvb3RlciI+DQogICAgICA8ZGl2IGNsYXNzPSJjb250YWluZXIiPg0KICAgICAgICA8Zm9vdGVyIGNsYXNzPSJmb290ZXIiPg0KICAgICAgICAgIHslIGluY2x1ZGUgc3ZnLWljb25zLmh0bWwgJX0NCiAgICAgICAgPC9mb290ZXI+DQogICAgICA8L2Rpdj4NCiAgICA8L2Rpdj4NCg0KICAgIHslIGluY2x1ZGUgYW5hbHl0aWNzLmh0bWwgJX0NCiAgICANCg0KICA8L2JvZHk+DQo8L2h0bWw+"
// //           }, function(err, res) {
// //               if (err) console.log(err);
// //               facultyArr.splice(0, 1);
// //               createmany(facultyArr);
// //           });
// //       }

// //     }
// //     createmany(facultyArray);
// //   }

// // response.json({ message: 'Individual faculty html created!' });   
// // });

//sa delete individual html of faculty, just compare while data.facultyName equals something in that repo, dont delete, and if it doesn't, delete it