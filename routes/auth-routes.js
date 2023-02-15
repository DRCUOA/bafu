const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const debug = require('debug');

// setup debug namespaces
const devAuthRLog = debug('devLog:routing_auth');
// import dao required
const userDao = require('../models/user-dao');
// import controller required
const userController = require('../controllers/auth-controller')

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



//password reset handling:
// Define the route to handle the password reset request
router.post("/api/resetpassword", async (req, res) => {
    devAuthRLog("/api/resetpassword  ?email = ${req.body",)
    const { email } = req.body;
    // Check if the email is valid
    const isValid = await isValid(email)

    if (!isValidEmail(email)) {
        return res.status(400).send('Invalid email');
    }

    // Generate a reset token and send it to the user's email address
    const resetToken = generateResetToken();
    sendResetToken(email, resetToken);

    // Return a success response
    return res.send('Reset token sent');
});


// Define the route to handle the password reset confirmation
router.post("/api/resetpassword/:resetToken", async (req, res) => {
    const { email, newPassword } = req.body;
    const { resetToken } = req.params;

    // Verify the reset token
    if (!isValidResetToken(email, resetToken)) {
        return res.status(400).send('Invalid reset token');
    }

    // Reset the user's password
    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, (err, salt) => {
        // returns salt
        bcrypt.hash(newPassword, salt, async (err, hash) => {
            // returns hash with salt

            try {
                const user = await userDao.findUserByEmail(email);
                user.password = hash;
                const userUpdated = await userDao.updateUser(user);
                res.send('Password reset successful');
            }
            catch (err) {
                res.status(500).send('Internal server error');
            }
        });
    });
});

/* 
 **     **    *     *****     ****   
 * *   * *    *    *     *   *     *
 *  * *  *    *    *         *  
 *   *   *    *     *****    *
 *       *    *          *   *
 *       *    *    *     *   *     *                                           
 *       *    *     *****     ****                                                              
* * * * * * * * * * * * * * * * * * */

router.get('/edaman-test', (req, res) => {
    const exampleReturn =
    {
        "text": "bread",
        "parsed": [],
        "hints":
            [
                {
                    "food":
                    {
                        "foodId": "food_akp3tlcas2gv00ay9dguua3bwqns",
                        "label": "Vogels Bread Soya and Linseed 800 g",
                        "knownAs": "Vogels Bread Soya And Linseed 800 G",
                        "nutrients":
                        {
                            "ENERC_KCAL": 190.0,
                            "PROCNT": 9.800000190734863,
                            "FAT": 4.199999809265137,
                            "CHOCDF": 28.600000381469727,
                            "FIBTG": 5.599999904632568
                        },
                        "brand": "Vogel",
                        "category": "Packaged foods",
                        "categoryLabel": "food",
                        "foodContentsLabel": "Wheat Flour; Wheat Flour; Calcium Carbonate; Iron; Niacin; Thiamin; Water; Kibbled Wheat; Kibbled Soya; 6%; Brown Linseed; 6%; Wheat Gluten; Fermented Wheat Flour; Rapeseed Oil; Salt; Yeast; Spirit Vinegar",
                        "image": "https://www.edamam.com/food-img/03f/03fa9538652943b25bb1cab7f1689186.jpg",
                        "servingSizes":
                            [
                                {
                                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
                                    "label": "Gram",
                                    "quantity": 50.0
                                }
                            ],
                        "servingsPerContainer": 16.0
                    },
                    "measures":
                        [
                            {
                                "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_serving",
                                "label": "Serving",
                                "weight": 50.0
                            },
                            {
                                "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_package",
                                "label": "Package",
                                "weight": 800.0
                            },
                            {
                                "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
                                "label": "Gram",
                                "weight": 1.0
                            },
                            {
                                "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_ounce",
                                "label": "Ounce",
                                "weight": 28.349523125
                            },
                            {
                                "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_pound",
                                "label": "Pound",
                                "weight": 453.59237
                            },
                            {
                                "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_kilogram",
                                "label": "Kilogram",
                                "weight": 1000.0
                            }
                        ]
                }
            ]
    }
    devAuthRLog(exampleReturn)
    res.render("edaman", { exampleReturn: exampleReturn })
});


router.get('/countdown', (req, res) => {
    const cheerio = require('cheerio');

    function parseProducts(html) {
        const $ = cheerio.load(html);
        const products = [];

        $('li').each((i, el) => {
            const $li = $(el);
            const $img = $li.find('img');
            const $h3 = $li.find('h3');
            const $p = $li.find('p');

            const product = {
                name: $h3.text(),
                image: $img.attr('src'),
                price: $p.text(),
                url: $li.find('a').attr('href')
            };

            products.push(product);
        });

        return products;
    }

    const html = `<ol><li><a href="https://assets.woolworths.com.au/images/2010/275499.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/275499.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="vogels toast bread mixed grain"></a><h3>vogels toast bread mixed grain</h3><p>$4.50 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/281455.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/281455.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="fresh vegetable cucumbers telegraph"></a><h3>fresh vegetable cucumbers telegraph</h3><p>$3.49 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/194870.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/194870.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="fresh vegetable lettuce iceberg wrapped"></a><h3>fresh vegetable lettuce iceberg wrapped</h3><p>$5.49 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/274498.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/274498.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="lisas dip feta &amp; spinach"></a><h3>lisas dip feta &amp; spinach</h3><p>$4.50 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/284617.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/284617.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="fresh tomatoes"></a><h3>fresh tomatoes</h3><p>$8.99 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/371236.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/371236.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="bluebird thick cut potato chips crispy bacon"></a><h3>bluebird thick cut potato chips crispy bacon</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/282827.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/282827.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="anchor calci+ trim milk"></a><h3>anchor calci+ trim milk</h3><p>$6.08 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/282729.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/282729.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="meadow fresh milk calci-trim"></a><h3>meadow fresh milk calci-trim</h3><p>$6.06 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/215948.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/215948.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="sanitarium peanut butter crunchy"></a><h3>sanitarium peanut butter crunchy</h3><p>$5.20 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/271223.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/271223.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="arnotts crackers harvest wheat"></a><h3>arnotts crackers harvest wheat</h3><p>$3.00 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/281082.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/281082.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="fresh vegetable broccoli head"></a><h3>fresh vegetable broccoli head</h3><p>$4.99 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/274989.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/274989.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="farmer brown eggs dozen brown size 7"></a><h3>farmer brown eggs dozen brown size 7</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/270580.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/270580.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="abe's bagels the natural"></a><h3>abe's bagels the natural</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/265652.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/265652.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="tegel chicken nuggets tempura battered"></a><h3>tegel chicken nuggets tempura battered</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/266022.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/266022.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="wattie's baked beans 420g"></a><h3>wattie's baked beans 420g</h3><p>$6.00 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/133211.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/133211.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="fresh fruit bananas yellow"></a><h3>fresh fruit bananas yellow</h3><p>$3.95 per kg.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/281634.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/281634.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="alpine cheese block edam"></a><h3>alpine cheese block edam</h3><p>$16.50 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/297512.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/297512.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="bluebird originals potato chips salt &amp; vinegar"></a><h3>bluebird originals potato chips salt &amp; vinegar</h3><p>$2.90 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/345858.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/345858.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="meadow fresh smooth yoghurt 12pk strawberry 12 x 100g"></a><h3>meadow fresh smooth yoghurt 12pk strawberry 12 x 100g</h3><p>$6.50 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/369348.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/369348.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="instore bakery scones cheese"></a><h3>instore bakery scones cheese</h3><p>$5.60 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/334110.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/334110.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="countdown ham shaved"></a><h3>countdown ham shaved</h3><p>$4.00 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/235129.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/235129.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="countdown ice cream chocolate"></a><h3>countdown ice cream chocolate</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/265716.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/265716.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="tegel chicken bites"></a><h3>tegel chicken bites</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/282769.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/282769.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="countdown milk lite"></a><h3>countdown milk lite</h3><p>$5.79 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/282766.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/282766.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="countdown milk lite"></a><h3>countdown milk lite</h3><p>$3.88 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/270041.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/270041.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="countdown sausage rolls free flow cheese"></a><h3>countdown sausage rolls free flow cheese</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/380810.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/380810.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="dove body wash triple moisturising"></a><h3>dove body wash triple moisturising</h3><p>$15.00 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/343727.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/343727.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="doritos corn chips supreme cheese party bag"></a><h3>doritos corn chips supreme cheese party bag</h3><p>$5.00 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/441564.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/441564.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="finish all in 1 dishwasher tablets lemon sparkle"></a><h3>finish all in 1 dishwasher tablets lemon sparkle</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/282220.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/282220.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="beehive streaky bacon"></a><h3>beehive streaky bacon</h3><p>$11.50 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/314978.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/314978.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="meadow fresh sour cream"></a><h3>meadow fresh sour cream</h3><p>$2.30 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/313809.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/313809.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="bluebird potato chips originals mix combo"></a><h3>bluebird potato chips originals mix combo</h3><p>$6.50 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/281184.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/281184.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="fresh vegetable capsicum yellow"></a><h3>fresh vegetable capsicum yellow</h3><p>$2.69 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/281197.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/281197.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="fresh vegetable capsicum red"></a><h3>fresh vegetable capsicum red</h3><p>$2.69 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/281199.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/281199.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="fresh vegetable capsicum green"></a><h3>fresh vegetable capsicum green</h3><p>$2.69 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/269748.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/269748.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="meadow fresh uht milk calci trim"></a><h3>meadow fresh uht milk calci trim</h3><p>$3.20 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/135344.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/135344.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="fresh vegetable carrots"></a><h3>fresh vegetable carrots</h3><p>$3.49 per kg.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/129858.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/129858.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="sealord fish fingers classic crumbed hoki 400g"></a><h3>sealord fish fingers classic crumbed hoki 400g</h3><p>$8.00 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/364667.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/364667.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="gourmet pate farmhouse"></a><h3>gourmet pate farmhouse</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/36322.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/36322.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="hubbards bran-ola granola almond &amp; chia pre + probiotics"></a><h3>hubbards bran-ola granola almond &amp; chia pre + probiotics</h3><p>$7.90 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/36306.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/36306.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="hubbards bran-ola granola raspberry &amp; blueberry pre + probiotics"></a><h3>hubbards bran-ola granola raspberry &amp; blueberry pre + probiotics</h3><p>$7.90 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/107325.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/107325.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="fresh vegetable courgette"></a><h3>fresh vegetable courgette</h3><p>$7.00 per kg.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/199982.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/199982.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="streets paddle pop ice cream cyclone 688ml"></a><h3>streets paddle pop ice cream cyclone 688ml</h3><p>$8.00 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/154340.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/154340.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="fresh vegetable lettuce traditional iceberg"></a><h3>fresh vegetable lettuce traditional iceberg</h3><p>$5.49 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/265266.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/265266.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="countdown plain flour"></a><h3>countdown plain flour</h3><p>$2.50 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/266563.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/266563.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="harraways rolled oats porridge"></a><h3>harraways rolled oats porridge</h3><p>$5.50 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/270752.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/270752.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="watties tomatoes mexican style"></a><h3>watties tomatoes mexican style</h3><p>$2.00 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/273835.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/273835.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="countdown creamed rice vanilla"></a><h3>countdown creamed rice vanilla</h3><p>$1.90 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/281785.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/281785.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="olivani spread lite"></a><h3>olivani spread lite</h3><p>$11.00 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/321266.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/321266.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="countdown burger buns sesame"></a><h3>countdown burger buns sesame</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/285868.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/285868.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="fresh vegetable kumara orange"></a><h3>fresh vegetable kumara orange</h3><p>$6.00 per kg.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/284601.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/284601.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="olivani spread lite"></a><h3>olivani spread lite</h3><p>$4.00 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/281961.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/281961.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="verkerks salami sliced pepperoni (med)"></a><h3>verkerks salami sliced pepperoni (med)</h3><p>$3.49 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/321326.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/321326.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="countdown burger buns"></a><h3>countdown burger buns</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/293094.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/293094.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="hellers ham boneless honey baked"></a><h3>hellers ham boneless honey baked</h3><p>$21.50 per kg.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/282377.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/282377.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="puhoi valley yoghurt tub divine berries"></a><h3>puhoi valley yoghurt tub divine berries</h3><p>$5.70 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/279296.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/279296.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="watties pasta sauce garlic"></a><h3>watties pasta sauce garlic</h3><p>$3.00 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/272562.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/272562.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="mr muscle glass cleaner blue"></a><h3>mr muscle glass cleaner blue</h3><p>$5.70 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/224409.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/224409.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="countdown fries straight cut"></a><h3>countdown fries straight cut</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/204831.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/204831.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="ajax spray n wipe kitchen spray cleaner multipurpose baking soda"></a><h3>ajax spray n wipe kitchen spray cleaner multipurpose baking soda</h3><p>$5.00 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/345142.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/345142.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="superb herb fresh vegetable coriander"></a><h3>superb herb fresh vegetable coriander</h3><p>$4.15 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/352484.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/352484.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="quilton toilet paper 18pk white unscented"></a><h3>quilton toilet paper 18pk white unscented</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/355535.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/355535.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="sealord fish fingers hoki fingers classic"></a><h3>sealord fish fingers hoki fingers classic</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/334879.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/334879.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="macro natural mixed nuts raw"></a><h3>macro natural mixed nuts raw</h3><p>$15.00 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/339362.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/339362.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="ajax spray n wipe spray cleaner bathroom antibacterial"></a><h3>ajax spray n wipe spray cleaner bathroom antibacterial</h3><p>$5.00 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/324764.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/324764.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="instore bakery baps"></a><h3>instore bakery baps</h3><p>$3.50 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/422421.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/422421.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="barkers NZ fruit syrup lite tropical"></a><h3>barkers NZ fruit syrup lite tropical</h3><p>$5.50 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/411926.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/411926.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="otaika valley eggs dozen free range size 7"></a><h3>otaika valley eggs dozen free range size 7</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/206416.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/206416.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="fresh vegetable pumpkin butternut whole"></a><h3>fresh vegetable pumpkin butternut whole</h3><p>$8.00 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/266566.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/266566.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="harraways rolled oats scotch porridge"></a><h3>harraways rolled oats scotch porridge</h3><p>$5.50 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/164152.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/164152.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="countdown fresh fruit apples royal gala"></a><h3>countdown fresh fruit apples royal gala</h3><p>$8.99 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/105418.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/105418.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="angel bay beef burger patties super gourmet 720g"></a><h3>angel bay beef burger patties super gourmet 720g</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/144329.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/144329.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="fresh vegetable onions brown"></a><h3>fresh vegetable onions brown</h3><p>$3.99 per kg.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/271636.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/271636.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="sprite soft drink no sugar"></a><h3>sprite soft drink no sugar</h3><p>$4.70 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/281106.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/281106.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="fresh vegetable sweetcorn cob vacuum pack"></a><h3>fresh vegetable sweetcorn cob vacuum pack</h3><p>$3.99 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/281857.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/281857.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="chesdale cheese slices colby processed"></a><h3>chesdale cheese slices colby processed</h3><p>$3.90 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/281911.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/281911.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="mainland edam cheese mild &amp; creamy"></a><h3>mainland edam cheese mild &amp; creamy</h3><p>$15.00 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/297515.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/297515.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="bluebird originals potato chips ready salted"></a><h3>bluebird originals potato chips ready salted</h3><p>$2.90 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/282055.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/282055.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="beehive streaky bacon"></a><h3>beehive streaky bacon</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/283280.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/283280.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="countdown fresh vegetable potatoes roasting/mashing"></a><h3>countdown fresh vegetable potatoes roasting/mashing</h3><p>$10.99 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/290384.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/290384.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="countdown chicken breast skinless boneless small pk"></a><h3>countdown chicken breast skinless boneless small pk</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/297517.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/297517.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="bluebird originals potato chips chicken"></a><h3>bluebird originals potato chips chicken</h3><p>$2.90 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/281903.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/281903.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="chesdale cheese slices cheddar processed"></a><h3>chesdale cheese slices cheddar processed</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/275509.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/275509.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="vogels sandwich bread mixed grain"></a><h3>vogels sandwich bread mixed grain</h3><p>$4.50 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/271810.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/271810.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="coca cola zero soft drink"></a><h3>coca cola zero soft drink</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/270268.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/270268.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="twist fruit drink blackcurrant 125ml"></a><h3>twist fruit drink blackcurrant 125ml</h3><p>$5.00 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/273149.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/273149.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="panadol paracetamol tablets"></a><h3>panadol paracetamol tablets</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/147312.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/147312.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="nutella hazelnut spread"></a><h3>nutella hazelnut spread</h3><p>$7.00 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/184184.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/184184.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="angel bay burger patties angus beef"></a><h3>angel bay burger patties angus beef</h3><p>$14.70 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/159875.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/159875.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="farrah's wraps original low carb"></a><h3>farrah's wraps original low carb</h3><p>$5.50 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/268818.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/268818.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="glad snaplock plastic bags sandwich 170x180mm"></a><h3>glad snaplock plastic bags sandwich 170x180mm</h3><p>$3.19 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/266525.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/266525.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="chelsea white sugar"></a><h3>chelsea white sugar</h3><p>$8.50 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/266536.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/266536.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="chelsea brown sugar soft"></a><h3>chelsea brown sugar soft</h3><p>$4.00 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/105115.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/105115.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="maltesers chocolate"></a><h3>maltesers chocolate</h3><p>$8.80 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/250361.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/250361.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="cadbury drinking chocolate"></a><h3>cadbury drinking chocolate</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/39891.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/39891.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="crosse &amp; blackwell pickle branston"></a><h3>crosse &amp; blackwell pickle branston</h3><p>$5.69 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/370734.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/370734.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="watties hearty soup beef hotpot"></a><h3>watties hearty soup beef hotpot</h3><p>$4.80 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/33022.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/33022.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="sanitarium weet-bix breakfast cereal"></a><h3>sanitarium weet-bix breakfast cereal</h3><p>$5.00 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/324270.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/324270.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="countdown beef mince grass fed beef NZ"></a><h3>countdown beef mince grass fed beef NZ</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/33343.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/33343.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="ocean blue smoked mackerel hot smoked pepper"></a><h3>ocean blue smoked mackerel hot smoked pepper</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/337251.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/337251.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="countdown fresh vegetable beans green"></a><h3>countdown fresh vegetable beans green</h3><p>$4.20 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/337292.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/337292.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="fresh vegetable cabbage green half"></a><h3>fresh vegetable cabbage green half</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/337557.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/337557.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="fresh vegetable potatoes baby perlas"></a><h3>fresh vegetable potatoes baby perlas</h3><p>$5.99 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/340833.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/340833.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="leader brand fresh vegetable slaw salad coleslaw"></a><h3>leader brand fresh vegetable slaw salad coleslaw</h3><p>$4.50 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/36215.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/36215.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="arnotts chocolate biscuits mint slice"></a><h3>arnotts chocolate biscuits mint slice</h3><p>$2.80 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/343892.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/343892.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="maggi 2 minute instant noodles multi pack chicken flavour"></a><h3>maggi 2 minute instant noodles multi pack chicken flavour</h3><p>$7.30 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/345140.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/345140.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="superb herb fresh vegetable chives"></a><h3>superb herb fresh vegetable chives</h3><p>$4.15 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/346555.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/346555.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="the laughing cow fresh cheese original 128g"></a><h3>the laughing cow fresh cheese original 128g</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/349313.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/349313.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="aunt bettys yorkshire pudding 220g"></a><h3>aunt bettys yorkshire pudding 220g</h3><p>$6.50 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/35681.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/35681.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="moccona classic instant freeze dried coffee medium roast"></a><h3>moccona classic instant freeze dried coffee medium roast</h3><p>$24.00 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/35822.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/35822.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="dettol antibacterial liquid hand wash lemon &amp; lime"></a><h3>dettol antibacterial liquid hand wash lemon &amp; lime</h3><p>$3.50 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/342887.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/342887.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="red seal mens multi vitamins"></a><h3>red seal mens multi vitamins</h3><p>$17.99 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/343078.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/343078.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="genoese fresh pesto chilled ground with fresh basil"></a><h3>genoese fresh pesto chilled ground with fresh basil</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/339317.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/339317.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="pg tips tea bags 220g"></a><h3>pg tips tea bags 220g</h3><p>$4.50 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/322516.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/322516.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="watties hearty soup ravioli with tomato &amp; beef"></a><h3>watties hearty soup ravioli with tomato &amp; beef</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/31795.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/31795.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="exit mould mould remover spray"></a><h3>exit mould mould remover spray</h3><p>$9.20 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/332537.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/332537.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="oral b electric toothbrush rechargeable + 2 refills"></a><h3>oral b electric toothbrush rechargeable + 2 refills</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/42246.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/42246.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="countdown beef mince premium grass fed NZ beef"></a><h3>countdown beef mince premium grass fed NZ beef</h3></li><li><a href="https://assets.woolworths.com.au/images/2010/384247.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/384247.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="arnotts shapes crackers cheese &amp; bacon"></a><h3>arnotts shapes crackers cheese &amp; bacon</h3><p>$3.50 each.</p></li><li><a href="https://assets.woolworths.com.au/images/2010/417499.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200"><img src="https://assets.woolworths.com.au/images/2010/417499.jpg?impolicy=wowcdxwbjbx&amp;w=200&amp;h=200" alt="super mi instant noodles multi pack mi goreng bbq chicken"></a><h3>super mi instant noodles multi pack mi goreng bbq chicken</h3><p>$3.50 each.</p></li></ol>`;

    const arrayObj = parseProducts(html);

    res.render('countdown', { arrayObj });
});

module.exports = router;