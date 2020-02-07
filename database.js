const { Pool, Client } = require('pg'); /* Require postgress for pool and client */

class Database {
    constructor() {

    }
}

class Singleton {
    // node js is single threaded so we don't have to worry about making it synchronous
    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new Database();
        }
    }
}

var foo = () => {
    console.log('bar');
}

module.exports = { foo, Singleton };