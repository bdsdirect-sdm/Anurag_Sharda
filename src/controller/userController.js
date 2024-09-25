const User = require('../model/User');
const express = require('express');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken')
const app = express();
const secret = "Anurag123#@!";
var token;

app.use(express.json());

const getUser = async (req, res) => {
    try{
        const user = await User.findByPk(req.params.id);
        if(user){
            res.json(user)
        }
        else{
            res.status(404).send("User not Found")
        }
    }
    catch(err){
        res.status(404).send(err + " & User not Found......");
    }
}

const addUser = async (req, res) => {
    try{

        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await User.create(req.body);
        
        res.json(user);
    }
    catch(err){
        console.log(err.message);
        res.status(404).send(err + " & User can't added")
    }
}

const updatUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if(user){
        await user.update(req.body);
        res.json(user);
    } else {
        res.status(404).send("User Not Found")
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({ where: { email: email } })
    // console.log(user)
    if(user){
        const pass = await bcrypt.compare(password, user.password);
        if(pass){
            token = JWT.sign({user}, secret);
            
            res.json({"users": user, "token": token});

            const check = JWT.verify(token,secret);
            console.log(check);
            console.log("User login successfully.....");
        } else {
            res.status(401).send("Invalid Credentials.....");
        }
    } else {
        res.status(401).send("User doesn't exist");
    }
}

const getAllUser = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
}

module.exports = {addUser, getUser, updatUser, loginUser, getAllUser};