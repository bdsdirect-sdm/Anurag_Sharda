const express = require("express");
const userController = require('../controller/userController')

const router = express.Router();

router.get('/', userController.getAllUser);
router.post('/adduser', userController.addUser);
router.post('/user', userController.loginUser);

router.put('/user/:id', userController.updatUser)
.get('/user/:id', userController.getUser);


// router.post('/addUser', userController.addUser);
// router.post('/User/:id', userController.loginUser);

// .post('/User/', userController.getAllUser)
// router.get('/User/:id', userController.getUser)
// .put('/User/:id', userController.updatUser);

module.exports = router;