require('./db/db');
require('dotenv').config();
const express = require('express');
const { server, app } = require('./io');
const volleyball = require('volleyball');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const routes = require('./routes/index');
const User = require('./models/user');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const PORT = process.env.PORT || 3001;
app.use(volleyball);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

//ERROR MIDDLEWARE
app.use((err, req, res, next) => {
  res.sendStatus(404).send(err);
});

// PASSPORT
app.use(session({ secret: 'panas', saveUninitialized: false, resave: false }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'nombre',
      passwordField: 'clave',
    },
    function (nombre, clave, done) {
      User.findOne({ nombre })
        .then(user => {
          if (!user) {
            return done(null, false);
          }
          user.hash(clave, user.salt).then(hash => {
            if (hash !== user.clave) {
              return done(null, false);
            }
            return done(null, user);
          });
        })
        .catch(done);
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user._id);
});
passport.deserializeUser(function (_id, done) {
  User.findById(_id)
    .then(user => {
      done(null, user);
    })
    .catch(done);
});

app.use('/api', routes);
app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/public/' + 'index.html');
});
app.set('trust proxy', true);

server.listen(PORT, () => console.log(`Try out http://localhost:${PORT}/`));
