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
const port = process.env.PORT || 1235;

//http logging
const morgan = require('morgan');
app.use(morgan('tiny'));
//dev debug logging
const debug = require('debug');
const devApp = debug('devLog:App');
devApp('dev log enabled');

//set-up cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser);

//enable url-encoding
app.use(express.urlencoded({extended: true}));

//make a static folder available
const path = require('path');
app.use(express.static(path.join(__dirname, "public")));

//setup view engine
const exhbs = require('express-handlebars');
const hbs = exhbs.create({
  defaultLayout: 'main',
  partialsDir: './views/partials'
});
  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');

//set middleware
const { toaster } = require("./controllers/toaster");
app.use(toaster)  

const { addUserToLocals, verifyAuthenticated } = require("./controllers/auth-controller");
app.use(addUserToLocals);




