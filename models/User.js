const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'user_info',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        socketid: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        create_time: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        delete_time: {
            type: Sequelize.DATE
        },
        avatar: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.INTEGER
        },
        sex: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
        bio: {
            type: Sequelize.STRING
        },
        status_active: {
            type: Sequelize.TINYINT
        },
        status_participate: {
            type: Sequelize.TINYINT
        }
    },
    {
        timestamps: false
    }
)