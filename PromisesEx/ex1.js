const crypto = require('crypto');

// Version 1, sorta works now
let Obj = {
    title: "6 Secure Randoms",
    randoms: []
}
let f = (size) => {
    let secureHex = "";
    crypto.randomBytes(size, function (err, buffer) {
        if (err) throw new Error(err);
        secureHex = buffer.toString('hex');
        Obj.randoms.push({ length: secureHex.length, random: secureHex })
        if (size === 4) console.log(Obj); // hardcoded print to make sure it prints at the end
    });
}
for (let index = 24; index > 0; index) {
    f(index);
    index -= 4;
}

//Version 2, With promises, kinda works
let Obj2 = {
    title: "6 Secure Randoms",
    randoms: []
}
makeSecureRandom = (size) => {
    return new Promise((resolve, reject) =>
        crypto.randomBytes(size, function (err, buffer) {
            if (err) throw new Error(err);
            let secureHex = buffer.toString('hex');
            resolve(secureHex);
        })

    ).then((data) => Obj2.randoms.push({ length: data.length, random: data }))
};
var p1 = makeSecureRandom(24);
var p2 = makeSecureRandom(20);
var p3 = makeSecureRandom(16);
var p4 = makeSecureRandom(12);
var p5 = makeSecureRandom(8);
var p6 = makeSecureRandom(4);
Promise.all([p1, p2, p3, p4, p5, p6]).then(() => console.log(Obj2));
