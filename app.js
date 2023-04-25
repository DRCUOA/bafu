/**
 * bafu - Business Analysis Framework Utility
 * v1.0.0
 * Author: Richard Clark
 * Licence: MIT
 * Copyright: nzwebapps
 */

//Setup express server, app and port variables
const express = require('express');
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

//setup view engine
const exhbs = require('express-handlebars');
const hbs = exhbs.create({
  defaultLayout: 'main',
  partialsDir: './views/partials'
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const morgan = require('morgan');
const debug = require('debug');

const devApp = debug('devLog:app_main');
devApp('dev log enabled');

app.use(morgan('tiny', {
  stream: {
    write: (message) => {
      devApp(message.trim());
    }
  }
}));

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
  res.render('pages/homepage');
});

// setup routes
const authRouting = require("./routes/auth-routes");
app.use("/", authRouting);

const pwdResetRouting = require("./routes/resetpwd-routes");
app.use("/reset", pwdResetRouting);

const clientInputValidation = require("./routes/validation-routes");
app.use('/validation', clientInputValidation);

const appRoutes = require("./routes/app-routes");
app.use('/app', appRoutes);

const diagramRoutes = require("./routes/diagram-routes");
app.use('/diagrams', diagramRoutes);

//start the server
app.listen(port, () => {
  devApp(`Bafu V1.0.0 | Listening on port ${port}`)
});

