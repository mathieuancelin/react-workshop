var express = require('express');
var bodyParser = require('body-parser');

var BordeauxWines = require('./data/bordeaux-wines.json');
var BurgundyWines = require('./data/burgundy-wines.json');
var ChampagneWines = require('./data/champagne-wines.json');
var LoireWines = require('./data/loire-wines.json');

var Regions = ["Bordeaux", "Bourgogne", "Champagne", "Languedoc", "Loire"];

// Wines by Region
var Wines = {
  "Bordeaux": BordeauxWines,
  "Bourgogne": BurgundyWines,
  "Champagne": ChampagneWines,
  "Languedoc": [],
  "Loire": LoireWines
}

// Wines by Id
var WinesById = {};
var byId = function(wine) { WinesById[wine.id] = wine };
BordeauxWines.forEach(byId);
BurgundyWines.forEach(byId);
ChampagneWines.forEach(byId);
LoireWines.forEach(byId);

// Likes and Comments
var Likes = ["chevrol-bel-air"];
var Comments = {
  "chevrol-bel-air": [{
    "date": new Date(),
    "title": "Un bon bordeaux !",
    "content": "J'ai bu le millésime 2009, parfait après une heure en carafe !"
  }]
};

// Create Server
var app = express();
app.use(bodyParser.json());
// Serve API documentation
app.use(express.static('doc'));
// Configure CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/**
 * @api {get} /wines?region=:region By Region
 * @apiName By Region
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

  if (region) {
    res.send(Wines[region] || []);
  }
  else {
    res.sendStatus(400);
  }
});

/**
 * @api {get} /likes All
 * @apiName All
 * @apiGroup Likes
 * @apiSampleRequest /api/likes
 *
 * @apiSuccess {Number}   count                     The number of likes across all wines
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "count": 42
 *     }
 */
app.get('/api/likes', function (req, res) {
  res.send({ count: Likes.length });
});

/**
 * @api {get} /comments All
 * @apiName All
 * @apiGroup Comments
 * @apiSampleRequest /api/comments
 *
 * @apiSuccess {Number}   count                     The number of comments across all wines
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "count": 42
 *     }
 */
app.get('/api/comments', function (req, res) {
  var count = 0;
  for (var key in Comments) {
    for (var idx in Comments[key]) {
      count += 1;
    }
  }
  res.send({ count: count });
});

/**
 * @api {get} /wines/:id By Id
 * @apiName By Id
 * @apiGroup Wines
 *
 * @apiParam {String} id the id of the wine
 *
 * @apiSampleRequest /api/wines/:id
 *
 * @apiSuccess {String}   id                  Id of the wine
 * @apiSuccess {String}   name                Name of the wine
 * @apiSuccess {String}   type                Type of wine
 * @apiSuccess {Object}   appellation         Appellation of the wine
 * @apiSuccess {String}   appellation.name    Name of the appellation
 * @apiSuccess {String}   appellation.region  Region of the appellation
 * @apiSuccess {String[]} grapes              Grapes used to produce the wine
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": "cheval-noir",
 *       "name": "Cheval Noir",
 *       "type": "Rouge",
 *       "appellation": {"name": "Saint-Emilion", "region": "Bordeaux"},
 *       "grapes": ["Cabernet Sauvignon", "Merlot", "Cabernet Franc"]
 *     }
 *
 * @apiError {String} 404 Not found - No wine corresponding to given 'id'
 */
app.get('/api/wines/:id', function (req, res) {
  var wine = WinesById[req.params.id];
  if (wine) {
    res.send(wine);
  }
  else {
    res.sendStatus(404);
  }
});

/**
 * @api {get} /wines/:id/image Image
 * @apiName Image
 * @apiGroup Wines
 *
 * @apiParam {String} id the id of the wine
 *
 * @apiError {String} 404 Not found - No wine corresponding to given 'id'
 */
app.get('/api/wines/:id/image', function (req, res) {
  var id = req.params.id;
  if (!WinesById[id]) {
    res.sendStatus(404);
  } else {
    // TODO what if image does not exists ?
    res.sendFile(__dirname + '/data/images/' + req.params.id + '.png');
  }
});

/**
 * @api {get} /wines/:id/like Liked ?
 * @apiName Liked ?
 * @apiGroup Wines
 *
 * @apiParam {String} id the id of the wine
 *
 * @apiSampleRequest /api/wines/:id/like
 *
 * @apiSuccess {Boolean} like indicates if the current user likes the wine
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "like": false
 *     }
 *
 * @apiError {String} 404 Not found - No wine corresponding to given 'id'
 */
app.get('/api/wines/:id/like', function (req, res) {
  var id = req.params.id;
  if (!WinesById[id]) {
    res.sendStatus(404);
  } else {
    res.send({like: Likes.indexOf(req.params.id) >= 0});
  }
});

/**
 * @api {post} /wines/:id/comments Like
 * @apiName Like
 * @apiGroup Wines
 *
 * @apiParam {String} id    the id of the wine
 * @apiParam {String} like  indicates if the current user likes the wine
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiError {String} 404 Not found - No wine corresponding to given 'id'
 * @apiError {String} 400 Bad request - missing 'like' boolean attribute in body
 */
app.post('/api/wines/:id/like', function (req, res) {
  var id = req.params.id;
  if (!WinesById[id]) {
    res.sendStatus(404);
  } else {
    var like = req.body.like;
    if (!(typeof(like) === "boolean")) {
        res.sendStatus(400);
    } else {
      var index = Likes.indexOf(id);
      if (like) {
        if (index < 0) {
          Likes.push(id);
        }
      } else {
        if (index >= 0) {
          Likes.splice(index, 1);
        }
      }
      res.sendStatus(200);
    }
  }
});

/**
 * @api {get} /wines/:id/comments Comments
 * @apiName Comments
 * @apiGroup Wines
 *
 * @apiParam {String} id the id of the wine
 *
 * @apiSampleRequest /api/wines/:id/comments
 *
 * @apiSuccess {String} date    the date of the comment
 * @apiSuccess {String} title   the title of the comment
 * @apiSuccess {String} content the comment
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         date: "2016-03-13T20:49:12.129Z",
 *         title: "Un bon bordeaux !",
 *         content: "J'ai bu le millésime 2009, parfait après une heure en carafe !"
 *       }
 *     ]
 *
 * @apiError {String} 404 Not found - No wine corresponding to given 'id'
 */
app.get('/api/wines/:id/comments', function (req, res) {
  var id = req.params.id;
  if (!WinesById[id]) {
    res.sendStatus(404);
  } else {
    res.send(Comments[req.params.id] || []);
  }
});

/**
 * @api {post} /wines/:id/comments Comment
 * @apiName Comment
 * @apiGroup Wines
 *
 * @apiParam {String} id the id of the wine
 * @apiParam {String} title    title of the comment.
 * @apiParam {String} content  content of the comment.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *
 * @apiError {String} 404 Not found - No wine corresponding to given 'id'
 * @apiError {String} 400 Bad request - missing 'title' or 'content' attribute in body
 */
app.post('/api/wines/:id/comments', function (req, res) {
  var id = req.params.id;
  if (!WinesById[id]) {
    res.sendStatus(404);
  } else {
    var body = req.body;
    if (!body.title || !body.content) {
        res.sendStatus(400);
    } else {
      var newComment = {
        date: new Date(),
        title: body.title,
        content: body.content
      };
      Comments[id] = (Comments[id] || []).concat(newComment);
      res.sendStatus(201);
    }
  }
});

/**
 * @api {get} /regions All
 * @apiName All
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
  res.send(Regions);
});

app.listen(3000, function () {
  console.log('React Workshop API listening on port 3000!');
});
