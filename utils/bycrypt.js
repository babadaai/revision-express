
const Bcrypt = require('bcryptjs');

const genHash = (payload) => {
    return Bcrypt.hashSync(payload, Number(process.env.SALT_ROUND));
}

const compHash = ({ payload, hashPayload }) => {
    if (!payload || !hashPayload) {
        throw new Error("payload and hashPayload are required");
    }
    return Bcrypt.compare(payload, hashPayload);
}

module.exports = { genHash, compHash };

