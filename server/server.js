const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const apiRoute = require('./routes/api/v1');

app.listen(config.PORT, () => {
  console.log("Server listening on port:" + config.PORT);
});

