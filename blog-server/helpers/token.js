require('dotenv').config();
const jwt = require('jsonwebtoken');

const sign = process.env.JWT_SECRET;

module.exports = {
  generate(data) {
    return jwt.sign(data, sign, { expiresIn: '7d' });
  },
  verify(token) {
    return jwt.verify(token, sign);
  },
};
