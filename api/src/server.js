var express = require('express');
var app = express();

app.use(express.static('doc'));

/**
 * @api {get} /wines All Wines
 * @apiName All Wines
 * @apiGroup Wines
 *
 * @apiSuccess {Object[]} wines      List of wines
 * @apiSuccess {String}   wines.name Name of the wine
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {"name" : "Chateau Margaux"},
 *       {"name" : "Chateau Angelus"}
 *     ]
 */
app.get('/api/wines', function (req, res) {
  res.send([
    {"name" : "Chateau Margaux"},
    {"name" : "Chateau Angelus"}
  ]);
});

app.listen(3000, function () {
  console.log('React Workshop API listening on port 3000!');
});
