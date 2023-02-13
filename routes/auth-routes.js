const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const debug = require('debug');

// setup debug namespaces
const devAuthRLog = debug('devLog:routing_auth');
// import dao required
const userDao = require('../models/user-dao');

router.post("/new-account", async (req, res) => {
    devAuthRLog("Received a request to the '/new-account' route");
    res.clearCookie("authToken");

    const saltRounds = 10;
    const password = req.body.password;

    bcrypt.genSalt(saltRounds, (err, salt) => {
        // returns salt
        bcrypt.hash(password, salt, async (err, hash) => {
            // returns hash with salt

            const user = {
                realName: req.body.realname,
                username: req.body.username.toLowerCase(),
                password: hash,
                email: req.body.email
            }

            try {
                devAuthRLog('attempting new user setup')
                const userCreated = await userDao.createUser(user);
                devAuthRLog(userCreated)
                res.setToastMessage("Account creation successful!  Please login using your new credentials.");
                res.redirect("/stage-login");
            }
            catch (err) {
                res.setToastMessage("Account creation unsuccessful!  Please try again or contact support for assistance.")
                devAuthRLog('new user setup failed!app returned error:', err);
                res.redirect("/stage-login")
            }
        });

    })
});


router.get("/logout", function (req, res) {
    res.clearCookie("authToken");
    devAuthRLog(`User ${res.locals.user.username} has logged out`)
    res.locals.user = null;
    res.setToastMessage("Successfully logged out! Come back soon, or don't what-evs");
    res.redirect("/");
});

router.get('/stage-login', (req, res) => {
    res.locals.userCreated = true;
    console.log(res.locals.userCreated)
    res.render('index');
});

router.post('/login', async (req, res) => {
    try {
        const username = req.body.username.toLowerCase();
        const password = req.body.password;
        const user = await userDao.retrieveUserWithUserName(username);
        const hash = user.password;
        bcrypt.compare(password, hash, async (err, result) => {
            if (result) {
                devAuthRLog(`User ${user.username} Authenticated`);
                const authToken = uuid();
                user.authToken = authToken;
                try {
                    await userDao.updateUser(user);
                } catch (err) {
                    devAuthRLog(`User ${user.username} error on update: ${err}`)
                }
                res.cookie("authToken", authToken);
                res.locals.user = user;
                let firstLetter = user.username.charAt(0).toUpperCase();
                let username = user.username.split('');
                username.splice(0, 1, firstLetter);
                let greetName = username.join('');
                res.render('homepage', { pageTitle: `Welcome ${greetName}` });

            } else {
                devAuthRLog(`User ${user.username}`)
                res.locals.user = null;
                setToastMessage = "Authentication Failed!"
                res.redirect("/");
            }

        });
    } catch (err) {
        devAuthRLog(`User Not Found`)
        res.locals.user = null;
        setToastMessage = "Authentication Failed!"
        res.redirect("/");
    }
});


module.exports = router;