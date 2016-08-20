var express = require('express');
var cfenv = require("cfenv");
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var sd = require('./service-discovery/service-discovery.js');

var appEnv = cfenv.getAppEnv();

// Setup middleware
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'www')));

// Setup Service Discovery
sd.register();

// Require the API routes.
require("./routes/routes.js")(app);

app.listen(appEnv.port, appEnv.bind);
console.log('App started on ' + appEnv.bind + ':' + appEnv.port);