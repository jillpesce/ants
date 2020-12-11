const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

var User = require('./models/User.js');
var Org = require('./models/Org.js');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

require('./pages/api/checklogin.js')(app);
require('./pages/api/createorg.js')(app);
require('./pages/api/createuser.js')(app);
require('./pages/api/login.js')(app);

app.listen(process.env.PORT || 3000);