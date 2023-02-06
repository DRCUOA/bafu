const express = require('express');
const router = express.Router();

const debug = require('debug');

// setup debug namespaces
const devClientInputVal = debug('devLog:clientIntVLog');

// import dao required
const userDao = require('../models/user-dao');

router.get("/email_check", async (req, res) => {
    const userEmail = await userDao.retrieveUserWithEmail(req.query.email);
    if(userEmail) {
        res.json({message: "inuse"});
    } else {
        res.json({message: ""});
    }
});

router.get('/username_check', async (req, res) => {
    const user = await userDao.retrieveUserWithUserName(req.query.username);
    if (user) {
        res.json({message: "taken"});
    } else {
        res.json({message: ""});
    }
});

module.exports = router;