var SIZE = 40; //secureHex is apparently double this in length.
require('crypto').randomBytes(SIZE, function (err, buffer) {
    if (err) throw new Error(err);
    let secureHex = buffer.toString('hex');
    console.log(secureHex.length);
});

function promiseFactory(msg, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { //To demonstrate an async call
            //do work here
            var ok = true;  // simulates the result of the operation
            if (delay === '5000') {
                ok = false;
            };

            if (ok) {
                resolve(msg.toUpperCase());
            }
            else {
                reject(new Error("Oh no, I broke"));
            }
        }, delay);
    });
};


let promise = new promiseFactory("hello", 1000);
console.log("before");
promise
    .then(msg => console.log("Result: " + msg))
    .catch(err => console.log("Error: " + err.msg));
console.log("After");
//In what order do you expect to see the log statements below

async function demo1() {
    let p = promiseFactory("hello2", 500);
    console.log("before2");
    const msg = await p;
    console.log("Result2: " + msg);
    console.log("After2");
}
demo1();