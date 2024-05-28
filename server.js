const express = require('express');
const db = require('./config/connection');
const routes = require('./routes')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

//once application is connected to database, then it will listend for the port to be used/started
db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });