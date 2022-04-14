const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const apiRoute = require('./routes/api/v1');
const authRoute = require('./routes/auth');

app.use('/api/v1', apiRoute);
app.use('/auth', authRoute);

app.listen(config.PORT, () => {
  console.log("Server listening on port:" + config.PORT);
});

