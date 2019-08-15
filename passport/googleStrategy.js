const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuthStrategy;

const { User } = require("../models");

module.exports = passport => {
  passport.use(
    new GoogleStrategy(
      {
        consumerKey: process.env.GOOGLE_ID,
        consumerSecret: process.env.GOOGLE_CONSUMER_SECRET,
        callbackURL: "http://www.example.com/auth/google/callback"
      },
      function(token, tokenSecret, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function(err, user) {
          return done(err, user);
        });
        // new GoogleStrategy(
        //   {
        //     consumerKey: process.env.GOOGLE_ID,
        //     callbackURL: "http://www.example.com/auth/google/callback"
        //   },
        //   async (accessToken, refreshToken, profile, done) => {
        //     try {
        //       const exUser = await User.find({
        //         where: { snsId: profile.id, provider: "google" }
        //       });
        //       if (exUser) {
        //         done(null, exUser);
        //       } else {
        //         const newUser = await User.create({
        //           email: profile._json && profile._json.gaccount_email,
        //           nick: profile.displayName,
        //           snsId: profile.id,
        //           provider: "google"
        //         });
        //         done(null, newUser);
        //       }
        //     } catch (error) {
        //       console.error(error);
        //       done(error);
        //     }
        //   }
        // )
      }
    )
  );
};
