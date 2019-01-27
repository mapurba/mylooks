
var express = require('express'),
    authRouter = express.Router();

/**
* API keys and Passport configuration.
*/

const passport = require('passport');
// const passportConfig = require('../config/passport');




/**
* OAuth authentication routes. (Sign in)
*/
authRouter.get('/instagram', passport.authenticate('instagram'));
authRouter.get('/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/profile' }), (req, res) => {
    res.redirect('/profile');
});
authRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
authRouter.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
    res.redirect(req.session.returnTo || '/profile');
});

/**
 * OAuth authorization routes. (API examples)
 */
// authRouter.get('/foursquare', passport.authorize('foursquare'));
// authRouter.get('/foursquare/callback', passport.authorize('foursquare', { failureRedirect: '/' }), (req, res) => {
//     res.redirect('/api/foursquare');
// });

module.exports = authRouter;