const getJwtSecret = () => process.env.JWT_SECRET;

module.exports = {
  getJwtSecret,
};
