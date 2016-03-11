var express = require('express');
var app = express();

var BordeauxWines = require('./data/bordeaux-wines.json')
var LoireWines = require('./data/loire-wines.json')

app.use(express.static('doc'));

/**
 * @api {get} /wines?region=:region All Wines
 * @apiName All Wines
 * @apiGroup Wines
 *
 * @apiParam {String} region the region to get wines from
 *
 * @apiSampleRequest /api/wines
 *
 * @apiSuccess {Object[]} wines                     List of wines
 * @apiSuccess {String}   wines.id                  Id of the wine
 * @apiSuccess {String}   wines.name                Name of the wine
 * @apiSuccess {String}   wines.type                Type of wine
 * @apiSuccess {Object}   wines.appellation         Appellation of the wine
 * @apiSuccess {String}   wines.appellation.name    Name of the appellation
 * @apiSuccess {String}   wines.appellation.region  Region of the appellation
 * @apiSuccess {String[]} wines.grapes              Grapes used to produce the wine
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": "cheval-noir",
 *         "name": "Cheval Noir",
 *         "type": "Rouge",
 *         "appellation": {"name": "Saint-Emilion", "region": "Bordeaux"},
 *         "grapes": ["Cabernet Sauvignon", "Merlot", "Cabernet Franc"]
 *       },
 *       {
 *         "id": "les-hauts-de-tour-prignac",
 *         "name": "Les Hauts de Tour Prignac",
 *         "type": "Rouge",
 *         "appellation": {"name": "Médoc", "region": "Bordeaux"},
 *         "grapes": ["Cabernet Sauvignon", "Merlot"]
 *       }
 *     ]
 *
 * @apiError {String} 400 Bad request - 'region' query parameter is missing.
 */
app.get('/api/wines', function (req, res) {
  var region = req.query.region;

  if (!region) {
    res.sendStatus(400);
  }
  else {
    switch (region) {
      case "Bordeaux":
        res.send(BordeauxWines);
        break;
      case "Loire":
          res.send(LoireWines);
          break;
      default:
        res.send([]);
    }
  }
});

/**
 * @api {get} /regions All Wine Regions
 * @apiName All Wine Regions
 * @apiGroup Regions
 *
 * @apiSampleRequest http://localhost:3000/api/regions
 *
 * @apiSuccess {String[]} regions Wine regions
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     ["Bordeaux", "Loire"]
 */
app.get('/api/regions', function (req, res) {
  res.send(["Bordeaux", "Loire"]);
});

app.listen(3000, function () {
  console.log('React Workshop API listening on port 3000!');
});
