'use strict';
var localStorage = require('localStorage');
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

module.exports = function (app, db) {

    var User = db.model('user');

    var githubConfig = app.getValue('env').GITHUB;

    var githubCredentials = {
        clientID: githubConfig.clientID,
        clientSecret: githubConfig.clientSecret,
        callbackURL: githubConfig.callbackURL
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {
        console.log(profile)
       localStorage.setItem('accessToken', accessToken);
        User.findOne({
                where: {
                    github_id: profile.id
                }
            })
            .then(function(user){
                if (user) {
                    return user;
                } else {
                    console.log("PROFILE", profile)
                     return User.create({
                        name: profile.username,
                        email: profile.username,
                        github_id: profile.id
                    })
                }
            })
            .then(function (userToLogin) {
                console.log("userToLogin", userToLogin);
                done(null, userToLogin);
            })
            .catch(function (err) {
                console.error('Error creating user from Github authentication', err);
                done(err);
            })

    };

    passport.use(new GitHubStrategy(githubCredentials, verifyCallback));

    app.get('/auth/github', passport.authenticate('github', {
          scope: [
            'user', 'public_repo', 'repo', 'gist'
        ]
    }));

    app.get('/auth/github/callback',
        passport.authenticate('github', {failureRedirect: '/login'}),
        function (req, res) {
            res.redirect('/');
    });

};
