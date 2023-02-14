/**
 * Showpan - Home shopping app
 * v1.0.0
 * Author: Richard Clark
 * Licence: MIT
 * Copyright: nzwebapps
 */

//Setup express server, app and port variables
const express = require('express');
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5050;

const customHelpers = require('./views/customhelpers/renderArrayHelper');

//setup view engine
const exhbs = require('express-handlebars');
const hbs = exhbs.create({
  defaultLayout: 'main',
  partialsDir: './views/partials'
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

customHelpers.register(hbs.handlebars);

//http logging
const morgan = require('morgan');
app.use(morgan('tiny'));
//dev debug logging
const debug = require('debug');
const devApp = debug('devLog:app_main');
devApp('dev log enabled');

//set-up cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//enable url-encoding

app.use(express.urlencoded({extended: true}));

//make a static folder available
const path = require('path');
app.use(express.static(path.join(__dirname, "public")));

//set middleware
const { toaster } = require("./controllers/toaster");
app.use(toaster)  

const { addUserToLocals, verifyAuthenticated } = require("./controllers/auth-controller");
app.use(addUserToLocals);

// index routing, to index for new users to hp for authenticated users
app.get('/', verifyAuthenticated, (req, res) => {
  devApp('routing to homepage');
  res.render('homepage');
});

// setup routes
const authRouting = require("./routes/auth-routes");
app.use("/", authRouting);

const clientInputValidation = require("./routes/clientValidationRouting.js");
app.use('/validation', clientInputValidation);

const itemsRouting = require("./routes/create-items-routing");
app.use("/items", itemsRouting);

const checkItemsRouting = require("./routes/check-items-routing");
app.use("/search-items", checkItemsRouting);

//start the server
app.listen(port, () => {
  devApp(`Shopping App V1.0.1 | Listening on port ${port}`)
});

