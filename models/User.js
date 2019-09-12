// const Sequlize = require("sequelize")
// const db = require("../database/db")

// module.exports = db.sequelize.define(
//     'user',
//     {
//         id: {
//             type: Sequlize.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         first_name: {
//             type: Sequlize.STRING
//         },
//         last_name: {
//             type: Sequlize.STRING
//         },
//         email: {
//             type: Sequlize.STRING
//         },
//         password: {
//             type: Sequlize.STRING
//         },
//         created: {
//             type: Sequlize.DATE,
//             defaultValue: Sequlize.NOW
//         }
//     },
//     {
//         timestamps: false
//     }
// )








const Sequlize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'user_info',
    {
        id: {
            type: Sequlize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequlize.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: Sequlize.STRING,
            unique: true,
            allowNull: false
        },
        socketid: {
            type: Sequlize.STRING
        },
        password: {
            type: Sequlize.STRING,
            unique: true,
            allowNull: false
        },
        create_time: {
            type: Sequlize.DATE,
            defaultValue: Sequlize.NOW
        },
        delete_time: {
            type: Sequlize.DATE
        },
        avatar: {
            type: Sequlize.STRING
        },
        age: {
            type: Sequlize.INTEGER
        },
        sex: {
            type: Sequlize.STRING
        },
        location: {
            type: Sequlize.STRING
        },
        bio: {
            type: Sequlize.STRING
        },
        status_active: {
            type: Sequlize.TINYINT
        },
        status_participate: {
            type: Sequlize.TINYINT
        }
    },
    {
        timestamps: false
    }
)