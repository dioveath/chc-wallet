const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

require('./config/passport.js')(passport);
app.use(passport.initialize());

const apiRoute = require('./routes/api/v1');
const authRoute = require('./routes/auth');

app.use('/api/v1', apiRoute);
app.use('/auth', authRoute);

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(config.PORT, () => {
  console.log("Server listening on port:" + config.PORT);
});

