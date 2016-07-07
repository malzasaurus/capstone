var path = require('path');
var devConfigPath = path.join(__dirname, './development.js');
var productionConfigPath = path.join(__dirname, './production.js');
// var pg = require('pg');

//if (process.env.NODE_ENV === 'production') {
  if(process.env.HEROKU_POSTGRESQL_JADE_URL){
    module.exports = require(productionConfigPath);
} else {
    module.exports = require(devConfigPath);
}

// app.get('/db', function (request, response) {
//   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//     client.query('SELECT * FROM test_table', function(err, result) {
//       done();
//       if (err)
//        { console.error(err); response.send("Error " + err); }
//       else
//        { response.render('pages/db', {results: result.rows} ); }
//     });
//   });
// });