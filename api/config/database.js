require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');

mongoose
  .connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log(`DB connection successful 🔓`))
  .catch((error) => console.log(`${error}`));
