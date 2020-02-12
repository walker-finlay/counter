var db = require('./db');

async function test() {
    await console.log(await db.getUserTable());
    await db.addUser('test', null, 64);
    await console.log(await db.getUserTable());
    db.disconnect();
}

test();