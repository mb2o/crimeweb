const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

const db = require('./models');

// Setup HTTP logging middleware
app.use(morgan('dev'));

// Set up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Load routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/people', require('./routes/person.routes'));

// Sync db
// Start Express server when successful
db.sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => console.log('Express server is running!'));
  })
  .catch(err => console.error(err));
