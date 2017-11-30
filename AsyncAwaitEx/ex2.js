const crypto = require('crypto');

makeSecureRandom = (size) => {
    return crypto.randomBytes(size).toString('hex');

};

makeSecureRandomAsync = async (size) => {
    const res = await makeSecureRandom(size);
    console.log(res);
}
makeSecureRandomAsync(10);