const InstagramPhotos = require('../models/InstagramPhotos');
const UserAllMedia = require('../models/UserAllMedia');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('home', '../public/index.html');
};

exports.getUserBlog = (req, res, next) => {
  var query = {}
  query.skip =req.params.next||0;
  query.limit=req.params.size||10;

  

//change the schema for 

  UserAllMedia.find({facebookId: req.params.userId},null,query).then((result) => {
        res.status(200).send(result);

    }).catch((err) => {
        res.status(489).send(err);

    })




  res.status(200);
};
