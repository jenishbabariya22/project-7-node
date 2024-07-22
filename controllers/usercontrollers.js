const usercontroller = require('../models/usermodels')
const formmodels = require('../models/formmodels')
const fs = require('fs');
const path = require('path')
const login = (req, res) => {
    if(res.locals.users){
        return res.redirect('/index');
    }
    return res.render('login');
}
const signup = (req, res) => {
    return res.render('signup')
}

const register = async (req, res) => {
    try {
        let name = req.body.name;
        let fullname = req.body.fullname;
        let email = req.body.email;
        let password = req.body.password;

        let user = await usercontroller.create({
            name: name,
            fullname: fullname,
            email: email,
            password: password
        })

        if (!name || !email || !password || !fullname) {
            console.log("all field are required");
            return res.redirect('back');
        }

        return res.redirect('/');

    } catch (err) {
        console.log(err);
        return false
    }
}
const loginpage = (req, res) => {
    return res.redirect('/index')
}
const index = async (req, res) => {
    try {

        let record = await formmodels.find({})

        return res.render('index', { record })
    } catch (err) {
        console.log(err);
        return flase
    }
}
const logout = (req, res) => {

    req.logout((err) => {
        if (err) {
            console.log("user not logout");
            return false;
        }

        return res.redirect('/');

    })
}

const post = (req, res) => {
    return res.render('post')
}
const add = async (req, res) => {
    try {

        let title = req.body.title;
        let discription = req.body.discription;

        let user = await formmodels.create({
            title, discription, images: req.file.path
        })

        return res.redirect('/')
    } catch (err) {
        console.log(err);
        return false;
    }
}
const deleterecord = async (req, res) => {
    try {
        let deleteid = req.query.deleteid
        let record = await formmodels.findById(deleteid)
        fs.unlinkSync(record.images)

        let all = await formmodels.findByIdAndDelete(deleteid)

        return res.redirect('index')
    } catch(err) {
        console.log(err);
        return false;
    }
}
const editrecord = async (req, res) => {
    try {
        let id = req.query.editid
        console.log(id);
        let record = await formmodels.findById(id)

        return res.render('edit', {
            record
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}
const edit = (req, res) => {
    return res.render('edit')
}
const editform = async (req, res) => {
    let id = req.body.id;
   
    try{
      
        if(req.file){
            let oldrecord = await formmodels.findById(id)
            fs.unlinkSync(oldrecord.images)
           
            let all = await formmodels.findByIdAndUpdate(id,{
                title : req.body.title,
                discription : req.body.discription,
                images : req.file.path 
            })
           
            return res.redirect('/');

        }else{
            let all = await formmodels.findById(id)


            let record = await formmodels.findByIdAndUpdate(id, {
                 title : req.body.title,
                discription: req.body.discription,
                images: req.body.images
            })
            return res.redirect('/');
        }
              
    }catch(err){
        console.log(err);
        return false
    }
}
module.exports = {
    login, signup, register, loginpage, index, logout, post, add, deleterecord, editrecord, edit, editform
}