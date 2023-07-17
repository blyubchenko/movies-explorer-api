const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errorHandler');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const router = require('./routes');
const config = require('./config');

const { port, mongodbUrl } = config;
const app = express();

mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errorHandler);

app.listen(port, () => {});
