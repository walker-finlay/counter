var db = require('./db');

async function test() {
    await console.log(await db.getCounterTable());
    await db.updateCounter(2, 1);
    await console.log(await db.getCounterTable());
    db.disconnect();
}

test();