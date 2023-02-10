const { query } = require('./db');

async function logoutUserFromAll(email) {
  await query(`
      UPDATE users
      SET tokens = null
      WHERE email = '${email}';
    `);
}

module.exports = {
  logoutUserFromAll,
};
