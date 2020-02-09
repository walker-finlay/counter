const { Pool, Client } = require('pg');

// ~ Connection ---------------------------------------------------------------
// node js is single threaded so we don't have to worry about making it synchronous
// Eventually this info will come from heroku DATABASE_URL env var
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
    addUser(name) {
        (async() => {
            // note: we don't try/catch this because if connecting throws an exception
            // we don't need to dispose of the client (it will be undefined)
            const client = await pool.connect();

            try {

            } catch (e) {
                /* Supposedly heroku pg doesn't support rollback? */
                // await client.query('ROLLBACK');
                throw e;
            } finally {
                client.release(); /* NB: always release clients back */
            }
        })
    },
    /* Get a user */
    /* Edit a user? */
    /* Remove a user */
    getUserTable() {
        pool
            .query('SELECT * FROM usertable')
            .then(res => console.log(res.rows))
            .catch(e => console.log(e));
    },

    /* Add a counter */
    /* Get a counter */
    /* Increment or decrement a counter */
    /* Remove a counter */
    /* Get the whole counter table */
    disconnect() {
        pool.end().then(() => { console.log('pool has ended.') });
    }
};