const express = require('express');

const usercontrollers = require('../controllers/usercontrollers')
const routes = express.Router();
const passport = require('passport')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const uploadimage = multer({ storage: storage }).single('images');

routes.get('/', usercontrollers.login)
routes.get('/signup', usercontrollers.signup)
routes.get('/index', passport.checkuser, usercontrollers.index)
routes.get('/logout', usercontrollers.logout)
routes.post('/register', usercontrollers.register)
routes.post('/loginpage', passport.authenticate('local', { failureRedirect: '/' }), usercontrollers.loginpage)
routes.get('/post', usercontrollers.post);

// form details

routes.post('/add', uploadimage, usercontrollers.add);
routes.post('/editform', uploadimage,usercontrollers.editform);
routes.get('/deleterecord',uploadimage, usercontrollers.deleterecord)
routes.get('/editrecord', usercontrollers.editrecord)
routes.get('/edit',uploadimage, usercontrollers.edit)

module.exports = routes