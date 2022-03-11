const path = require('path');
const User = require(path.join(__dirname, '../models/user'));

require(path.join(__dirname, '../config/database'));

new User({
  username: 'spencer',
  password: 'thepassword',
})
  .save()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => console.log(error));
