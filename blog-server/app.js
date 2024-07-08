require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const PORT = process.env.PORT;

const app = express();

// app.use(express.static('../blog/build'));
app.use(cookieParser());
app.use(express.json());

app.use('/', router);

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}...`);
  });
});
