const passport = require('passport');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const User = require('./models/user.model');



// Google OAuth Strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    // Could get accessed in two ways:
    // 1) When registering for the first time
    // 2) When linking account to the existing one

    // Should have full user profile over here
    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);

    if (req.user) {
      // We're already logged in, time for linking account!
      // Add Google's data to an existing account
      req.user.method.push('google')
      req.user.google = {
        id: profile.id,
        email: profile.emails[0].value
      }
      await req.user.save()
      return done(null, req.user);
    } else {
      // We're in the account creation process
      let existingUser = await User.findOne({ "google.id": profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }

      // Check if we have someone with the same email
      existingUser = await User.findOne({ "local.email": profile.emails[0].value })
      if (existingUser) {
        // We want to merge google's data with local auth
        existingUser.method.push('google')
        existingUser.google = {
          id: profile.id,
          email: profile.emails[0].value
        }
        await existingUser.save()
        return done(null, existingUser);
      }

      const newUser = new User({
        method: ['google'],
        google: {
          id: profile.id,
          email: profile.emails[0].value
        }
      });
  
      done(null, newUser);
    }
  } catch(error) {
    done(error, false, error.message);
  }
}));





passport.use('facebookToken', new FacebookTokenStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    
    if (req.user) {
      // We're already logged in, time for linking account!
      // Add Facebook's data to an existing account
      req.user.method.push('facebook')
      req.user.facebook = {
        id: profile.id,
        email: profile.emails[0].value
      }
      await req.user.save();
      return done(null, req.user);
    } else {
      // We're in the account creation process
      let existingUser = await User.findOne({ "facebook.id": profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }

      // Check if we have someone with the same email
      existingUser = await User.findOne({ "local.email": profile.emails[0].value })
      if (existingUser) {
        // We want to merge facebook's data with local auth
        existingUser.method.push('facebook')
        existingUser.facebook = {
          id: profile.id,
          email: profile.emails[0].value
        }
        await existingUser.save()
        return done(null, existingUser);
      }

      const newUser = new User({
        method: ['facebook'],
        facebook: {
          id: profile.id,
          email: profile.emails[0].value
        }
      });

      done(null, newUser);
    }
  } catch(error) {
    done(error, false, error.message);
  }
}));
