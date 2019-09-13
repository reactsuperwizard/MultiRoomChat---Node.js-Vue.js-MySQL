// const express = require("express")
// const users = express.Router()
// const cors = require("cors")
// const jwt = require("jsonwebtoken")
// const bcrypt = require("bcrypt")

// const User = require("../models/User")
// users.use(cors())

// process.env.SECRET_KEY = 'secret'

// users.post("/register", (req, res) => {
//     const today = new Date()
//     const userData = {
//         first_name : req.body.first_name,
//         last_name : req.body.last_name,
//         email : req.body.email,
//         password : req.body.password,
//         created : today
//     }

//     User.findOne({
//         where: {
//             email: req.body.email
//         }
//     })
//     .then(user => {
//         if (!user) {
//             bcrypt.hash(req.body.password, 10, (err, hash) => {
//                 userData.password = hash
//                 User.create(userData)
//                     .then(user => {
//                         res.json({status: user.email + ' registered'})
//                     })
//                     .catch(err => {
//                         res.send('error: ' + err)
//                     })
//             })
//         } else {
//             res.json({error: 'User already exists'})
//         }
//     })
//     .catch(err => {
//         res.send( 'error: ' + err)
//     })
// })

// users.post("/login", (req, res) => {
//     User.findOne({
//         where: {
//             email: req.body.email
//         }
//     })
//     .then(user => {
//         if (user) {
//             if (bcrypt.compareSync(req.body.password, user.password)) {
//                 let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
//                     expiresIn: 1440
//                 })
//                 res.send(token)
//             }
//         } else {
//             res.status(400).json({error: 'User does not exist'})
//         }
//     })
//     .catch(err => {
//         res.status(400).json({error: err})
//     })
// })

// module.exports = users









const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const multer = require('multer')

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

process.env.SECRET_KEY = 'secret'

users.post("/register", (req, res) => {
    const today = new Date()
    const userData = {
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        create_time : today
    }
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if (!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash
                User.create(userData)
                    .then(user => {
                        res.json({status: user.email + ' registered'})
                    })
                    .catch(err => {
                        res.send('error: ' + err)
                    })
            })
        } else {
            res.json({error: 'User already exists'})
        }
    })
    .catch(err => {
        res.send( 'error: ' + err)
    })
})

users.put("/register", upload.single('avatar'), (req, res) => {
    console.log(req.file);
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
            console.log('updating')
            // bcrypt.hash(req.body.password, 10, (err, hash) => {
            //     userData.password = hash
                console.log(user['avatar'])
                if (req.file) {
                    userData['avatar'] = req.file.filename
                } else if (user['avatar'] == 'male.jpg' || user['avatar'] == 'female.jpg' || user['avatar'] == 'default.jpg') {
                    console.log('no file choosen')
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
                            console.log('updating failed')
                        })
                    })
                    .catch(err => {
                        console.log('updating failed')
                        res.send('error: ' + err)
                    })
            }
            // )
        // } else {
        //     console.log('no details for this user')
        //     res.json({error: 'no details for this user'})
        // }
    })
    .catch(err => {
        console.log('no user for this email')
        res.send( 'error: ' + err)
    })
})

users.post("/login", (req, res) => {
    User.findOne({
        where: {
            name: req.body.name
        }
    })
    .then(user => {
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                console.log(user.dataValues);
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token)
            } else {
                res.status(400).json({error: 'password is wrong'})
            }
        } else {
            res.status(400).json({error: 'User does not exist'})
        }
    })
    .catch(err => {
        res.status(400).json({error: err})
    })
})

module.exports = users