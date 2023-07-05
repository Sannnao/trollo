const { Pool } = require('pg');

const pool = new Pool();

module.exports = {
  async query(text, params) {
    try {
      const res = await pool.query(text, params);

      return res;
    } catch (err) {
      console.log('Query error:', err);
      throw err;
    }
  },
};
