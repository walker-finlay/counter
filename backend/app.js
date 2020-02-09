var db = require('./db');

db.foo();

async function test() {
    await db.getUserTable();
    db.disconnect();
}

test();