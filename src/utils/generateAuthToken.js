const jwt = require('jsonwebtoken');
const { getJwtSecret } = require('./getJwtSecret');

const generateAuthToken = (email) => {
  const token = jwt.sign({ email }, getJwtSecret(), {
    expiresIn: '12h',
  });

  return token;
};

module.exports = {
  generateAuthToken,
};
