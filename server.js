const express = require('express');
const db = require('./connection/connection.js');
// Require model
const { Item } = require('./models');
// const mongoose = require("mongoose");
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

// mongoose.set('strictQuery', true);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.get('/user', (req, res) => {
  

    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    }
});

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  })
