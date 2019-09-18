const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const multer = require('multer')
const verify = require('./verifytoken')
var nodemailer = require('nodemailer')
const Sequelize = require("sequelize")

require('dotenv').config();
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './client/static/public/avatar');
    },
    filename: function(req, file, cb) {
        cb(null,  file.originalname);
    }
});

const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(null, false);
    } else {
        cb(null, true);
    }
}

const upload = multer({storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 50
    },
    fileFilter: fileFilter
})

const User = require("../models/User")
users.use(cors())



users.post("/register", async (req, res) => {
    const today = new Date()
    const userData = {
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        create_time : today
    }
    Sequelize.or
    User.findOne({
        where: Sequelize.or(
                {name: req.body.name},
                {email: req.body.email})
    })
    .then(user => {
        if (!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash
                User.create(userData)
                    .then(user => {
                        res.send(user)
                    })
                    .catch(err => {
                        res.status(400).send('User create failed with this issue ' + err)
                    })
            })
        } else {
            res.status(400).send('Name or Email already exists')
        }
    })
    .catch(err => {
        res.status(400).send('Register Error')
    })
})

users.put("/register",verify, upload.single('avatar'), (req, res) => {
    const today = new Date()
    const userData = {
        name : req.body.name,
        age : req.body.age,
        sex : req.body.sex,
        location : req.body.location,
        bio : req.body.bio,
        create_time : today
    }
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if (user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (req.body.password != '') {
                    userData.password = hash
                }
                if (req.file) {
                    userData['avatar'] = req.file.filename
                } else if (user['avatar'] == 'male.jpg' || user['avatar'] == 'female.jpg' || user['avatar'] == 'default.jpg') {
                    userData['avatar'] = (userData['sex']!='null'?userData['sex']:'default')+'.jpg'
                }
                User.update(userData, {where: {email: req.body.email}} )
                    .then(user => {
                        console.log('updated');
                        User.findOne({
                            where: {
                                email: req.body.email
                            }
                        })
                        .then(user => {
                            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                                expiresIn: 1440
                            })
                            res.send(token)
                        })
                        .catch(e => {
                            res.status(400).send('Updated successfully but cannot get user data due to the following reason' + e)
                        })
                    })
                    .catch(err => {
                        res.status(400).send('Update Failed due to the following reason ' + err)
                    })
            })
        } else {
            res.status(400).send('Email not found')
        }
    })
    .catch(err => {
        res.status(400).send('Find and Update due to the Failed following reason ' + err)
    })
})

users.post("/login", (req, res) => {
    User.findOne({
        where: {
            name: req.body.name
        }
    })
    .then(user => {
        if (!user) {
            return res.status(400).send('User does not exist')
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
            })
            res.header('auth-token', token).send(token)
        } else {
            res.status(400).send('password is wrong')
        }
    })
    .catch(err => {
        res.status(400).send('Username ' + req.body.name + ' not found with this issue '+ err)
    })
})

users.post("/forgotpassword", (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if (!user) {
            return res.status(400).send('Email does not exist')
        }
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
        })
        user['token'] = token
        var transport = nodemailer.createTransport({
            host: process.env.mailServerhost,
            port: process.env.mailServerport,
            auth: {
                user: process.env.mailServeruser, //generated by Mailtrap
                pass: process.env.mailServerpass //generated by Mailtrap
            }
        });
        transport.verify(function(error, success) {
            if (error) {
                return res.status(400).send('mailtrap authorization failed ' + error)
            } else {
                console.log('Server is ready to take our messages');
            }
        });
        var mailOptions = {
            from: '"Example Team" <from@example.com>',
            // to: 'harry.potter0409@outlook.com',
            to: process.env.myEmailAddress,
            subject: 'Forgot Password',
            text: 'Hello'+req.body.email, 
            html: '<b>Hey there! </b><br><a href="http://localhost:8081/#/resetpassword?token='+token+'">Please click this link</a>'
        };
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(400).send('Cannot send email via mailtrap ' + error)
            }
            console.log('Message sent: %s', info.messageId);
        });
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: process.env.myEmailAddress,
          from: 'test@example.com',
          subject: 'Sending with SendGrid is Fun',
          text: 'and easy to do anywhere, even with Node.js',
          html: '<b>Hey there! </b><br><a href="http://localhost:8081/#/resetpassword?token='+token+'">Please click this link</a>'
        };
        sgMail.send(msg ,(error, info) => {
            if (error) {
                return res.status(400).send('Cannot send email via sendgrid ' + error)
            }
            console.log('Message sent: %s', info.messageId);
        });
    })
    .catch(err => {
        console.log('email not found')
        res.status(400).send('Email not found due to following issue ' + err)
    })
})


// users.post("/resetpassword", verify ,(req, res) => {
users.post("/resetpassword", (req, res) => {
    const userData = {
    }
    console.log(req.body)
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            console.log(req.body.password)
            if (req.body.password != undefined) {
                userData.password = hash
                User.update(userData, {where: {email: req.body.email}} )
                    .then(user => {
                        console.log('updated');
                        User.findOne({
                            where: {
                                email: req.body.email
                            }
                        })
                        .then(user => {
                            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                                expiresIn: 1440
                            })
                            res.send(token)
                        })
                    })
            } else {
                res.status(400).json({error: err})
            }
        })
    })
    .catch(err => {
        res.status(400).json({error: err})
    })
})

users.get("/get/", verify, (req, res) => {
    console.log('get')
    res.send(req.user)
})

module.exports = users