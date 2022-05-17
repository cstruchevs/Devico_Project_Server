import { app } from '../app'
import passport from 'passport'
import { RequestHandler } from 'express';

const GoogleStrategy = require("passport-google-oauth20").Strategy;

app.use(passport.initialize()) // Used to initialize passport
app.use(passport.session()) // Used to persist login sessions

passport.use(
  new GoogleStrategy(
    {
      clientID: '610691592930-diiebljoinm38jgsiks1d19vli062svp.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // Directory API here

      let userData = {
        user: profile,
        token: accessToken,
      }

      done(null, userData)
    },
  ),
)

app.get('/callback', passport.authenticate('google'), (req: any, res) => {
    let token = req.user?.token;
    res.redirect("http://localhost:3000?token=" + token);
});

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile'], // Used to specify the required data
  }),
)
