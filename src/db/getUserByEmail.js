const { query } = require('./db');

async function getUserByEmail(email) {
  const res = await query(`
    SELECT email, user_id FROM users WHERE email = '${email}';
  `);

  const user = res.rows[0];
  return user;
}

module.exports = {
  getUserByEmail,
};
