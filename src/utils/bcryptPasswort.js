const bcrypt = require("bcryptjs");

const bcryptPassword = async (password) => {
  const pass = await bcrypt.hash(password, 8);
  return pass;
};

module.exports = {
  bcryptPassword,
};
