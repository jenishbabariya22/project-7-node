const express = require('express');

const port = 8000;

const app = express();
const path = require('path');
const fs = require('fs')
app.set('view engine', 'ejs');
const db = require('./config/db');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const passport = require('passport');
const passportLocal = require('./config/passportlocal');
const session = require('express-session');

app.use(session({
    name: 'user',
    secret: 'user',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use(express.urlencoded());

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setuser)

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded());
app.use('/', require('./routes/indexroutes'));
app.listen(port, (err) => {
    if (err) {
        console.log("server is not started on port");
        return false;
    }
    console.log(`server is stared on port :- ${port}`);
})