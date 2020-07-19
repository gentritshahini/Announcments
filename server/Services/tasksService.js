const pool = require('../db')
pool.connect()

const SELECT_ALL_USERS_QUERY = 'SELECT * FROM users'

async function create({ title, description }) {
    // TODO
    const user = await pool.query(SELECT_ALL_USERS_QUERY)
                        .then(results => {
                            return results.rows.find(u => u.username === username && u.password === password);
                        })
                        .catch(e => console.log(e))
                        .finally(() => pool.end)

}

async function getAll() {

}

module.exports = {
    create,
    getAll
};
