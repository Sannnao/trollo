const { query } = require("./db");
const { bcryptPassword } = require("../utils/bcryptPasswort");

async function createUser(body) {
  const { name, email, password } = body;

  await query(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS users (
      user_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
      name VARCHAR ( 50 ) UNIQUE NOT NULL,
      email VARCHAR ( 255 ) UNIQUE NOT NULL,
      password VARCHAR ( 255 ) NOT NULL,
      tokens TEXT []
    );
  `);

  const bcryptedPassword = await bcryptPassword(password);

  await query(`
      INSERT INTO users (name, email, password)
      VALUES ('${name}', '${email}', '${bcryptedPassword}')
  `);
}

module.exports = {
  createUser,
};
