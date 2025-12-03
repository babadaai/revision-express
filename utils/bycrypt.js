
const Bcrypt = require('bcryptjs');

const genHash = (plain) => {
    return Bcrypt.hashSync(plain, Number(process.env.SALT_ROUND));
};

const compHash = (plain, hashed) => {
    return Bcrypt.compareSync(plain, hashed);
};

module.exports = { genHash, compHash };
