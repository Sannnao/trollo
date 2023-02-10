const bcrypt = require("bcryptjs");

const comparePassword = async (userPassword, dbPassword) => {
  const isCorrect = await bcrypt.compare(userPassword, dbPassword);
  return isCorrect;
};

module.exports = {
  comparePassword,
};
