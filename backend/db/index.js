const { Pool, Client } = require('pg');

// ~ Connection ---------------------------------------------------------------
// node js is single threaded so we don't have to worry about making it synchronous
// TODO: Eventually this info will come from heroku DATABASE_URL env var
const connectionString = 'postgres://cxoifxrvkchoxz:d99c996b724de1f275bd8e42f5606a04c2a8d589588696a829da4d451dab47d1@ec2-34-235-108-68.compute-1.amazonaws.com:5432/dao6727q68ugdu';
const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false,
    }
});

module.exports = {
    // ~ Data access ----------------------------------------------------------
    // Use promises (or async/await?) for nice error handling
    addUser(name, passhash, counterval) {
        (async() => {
            // note: we don't try/catch this because if connecting throws an exception
            // we don't need to dispose of the client (it will be undefined)
            const client = await pool.connect();

            try {
                await client.query('BEGIN');
                const queryText = 'INSERT INTO usertable VALUES (default, $1, $2) RETURNING u_id';
                const values = [name, passhash];
                const res = await client.query(queryText, values);

                const insertCounterText = 'INSERT INTO counter VALUES (default, $1, $2)';
                const insertCounterValues = [res.rows[0].u_id, counterval];
                await client.query(insertCounterText, insertCounterValues);
                await client.query('COMMIT');
            } catch (e) {
                /* does heroku pg support rollback within a transaction? */
                await client.query('ROLLBACK');
                throw e;
            } finally {
                client.release(); /* NB: always release clients back */
            }
        })().catch(e => console.error(e.stack));
    },
    getPass(name){
        const text = 'SELECT passhash FROM usertable WHERE username = $1';
        return pool
            .query(text, [name])
            .then(res => {return res.rows})
            .catch(e => console.error(e.stack));
    },
    getUserName(name) {
        const text = 'SELECT * FROM usertable WHERE username = $1';
        return pool
            .query(text, [name])
            .then(res => { return res.rows })
            .catch(e => console.error(e.stack));
    },
    getUID(u_id) {
        const text = 'SELECT * FROM usertable WHERE u_id = $1';
        return pool
            .query(text, [u_id])
            .then(res => { return res.rows })
            .catch(e => console.error(e.stack));
    },
    /* Edit a user? */
    /* Remove a user? */
    getUserTable() {
        return pool
            .query('SELECT * FROM usertable')
            .then(res => { return res.rows })
            .catch(e => console.error(e.stack));
    },
    addCounter(u_id, value) {
        const text = 'INSERT INTO counter VALUES (default, $1, $2) RETURNING *';
        /* Probably want to return some kind of status message */
        return pool
            .query(text, [u_id, value])
            .then(() => {
                if (res.rows) console.log('counter added');
            })
            .catch(e => console.error(e.stack));
    },
    getCounter(c_id) {
        const text = 'SELECT * FROM counter WHERE c_id = $1';
        return pool
            .query(text, [c_id])
            .then(res => { return res.rows })
            .catch(e => console.error(e.stack));
    },
    /* Get counters for a u_id */
    getUserCounters(u_id) {
        const text = 'SELECT * FROM counter WHERE u_id = $1';
        return pool
            .query(text, [u_id])
            .then(res => { return res.rows })
            .catch(e => console.error(e.stack));
    },
    /**
     * Increment or decrement a counter 
     * delta should be in {-1, 1}
     */
    updateCounter(c_id, delta) {
        const text = 'UPDATE counter SET value = value + $1 WHERE c_id = $2';
        pool
            .query(text, [delta, c_id])
            .then(console.log('counter changed'))
            .catch(e => { console.error(e.stack) });
    },
    /* Remove a counter */
    getCounterTable() {
        return pool
            .query('SELECT * FROM counter')
            .then(res => { return res.rows })
            .catch(e => console.error(e.stack))
    },
    deleteCounter(c_id) {
        // Is this method even necessary?
        const text = 'DELETE FROM counter WHERE c_id = $1';
        pool
            .query(text, [c_id])
            .then(console.log('counter deleted'))
            .catch(e => { console.error(e.stack) })
    },
    disconnect() {
        pool.end().then(() => { console.log('pool has ended.') });
    }
};