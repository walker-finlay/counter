var db = require('./db');

async function test() {
    await console.log(await db.getUserTable());
    db.disconnect();
}

test();