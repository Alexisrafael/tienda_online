const express = require('express'); 
const morgan = require('morgan')
const cors = require('cors');
const index = require('./rutes/index')
const bodyParser = require('body-parser');

require('./database')

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use(morgan("dev"))

app.use("/", index)


module.exports = app ;