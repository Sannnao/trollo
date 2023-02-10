const jwt = require('jsonwebtoken');
const { getJwtSecret } = require('../utils/getJwtSecret');
const { query } = require('../db/db');

const auth = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const data = jwt.verify(token, getJwtSecret());

    const res = await query(`
      SELECT email, tokens FROM users
      WHERE '${token}' = ANY (tokens) AND
            email = '${data.email}';
    `);

    const isTokens = res.rows[0].tokens;

    if (isTokens) {
      const email = data.email;
      req.email = email;
      req.token = token;
      next();
    } else {
      throw new Error();
    }
  } catch (err) {
    res.status(401).send({ error: 'Not authorized to access this resource' });
  }
};

module.exports = auth;
