const { query } = require('./db');

async function logoutUser(email, token) {
  const res = await query(`
    SELECT tokens FROM users WHERE email = '${email}';
  `);

  const tokens = res.rows[0].tokens;
  const filteredTokens = tokens.filter((dbToken) => dbToken !== token);

  if (filteredTokens.length) {
    const sqlValidArray = JSON.stringify(filteredTokens).replaceAll('"', "'");

    await query(`
      UPDATE users
      SET tokens = ARRAY ${sqlValidArray}
      WHERE email = '${email}';
    `);
  } else {
    await query(`
      UPDATE users
      SET tokens = null
      WHERE email = '${email}';
    `);
  }
}

module.exports = {
  logoutUser,
};
