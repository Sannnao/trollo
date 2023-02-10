const { query } = require('./db');
const { generateAuthToken } = require('../utils/generateAuthToken');
const { comparePassword } = require('../utils/comparePassword');

async function loginUser(body) {
  const { email, password } = body;

  const res = await query(`
    SELECT user_id, password, tokens
    FROM users
    WHERE email = '${email}';
  `);

  if (!res.rows.length) {
    throw new Error({ error: 'User with such email does not exist' });
  }

  const user = res.rows[0];
  const user_id = user.user_id;
  const dbPassword = user.password;

  const isPasswordCorrect = await comparePassword(password, dbPassword);

  if (!isPasswordCorrect) {
    throw new Error({ error: 'Invalid login email or password' });
  }

  const tokens = user.tokens;
  const token = generateAuthToken(email);

  if (tokens) {
    const sqlValidArray = JSON.stringify(tokens).replaceAll('"', "'");

    await query(`
      UPDATE users
      SET tokens = array_append(ARRAY ${sqlValidArray}, '${token}')
      WHERE email = '${email}';
    `);
  } else {
    await query(`
      UPDATE users
      SET tokens = '{"${token}"}'
      WHERE email = '${email}';
    `);
  }

  return { user_id, token };
}

module.exports = {
  loginUser,
};
