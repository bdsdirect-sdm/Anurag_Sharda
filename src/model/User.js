const {Sequelize, DataTypes} = require("sequelize")
const sequel = require('../config/config')

const User = sequel.define('User',{
    name:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING,
        unique:true
    },
    password:{
        type:DataTypes.STRING
    }
});

module.exports = User;