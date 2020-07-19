const config = require('config.json');
const jwt = require('jsonwebtoken');
const pool = require('./../server/db');

pool.connect()

const SELECT_ALL_USERS_QUERY = 'SELECT * FROM users'

module.exports = {
    authenticate,
    getAll
};


async function authenticate({ username, password }) {

    const user = pool.query(SELECT_ALL_USERS_QUERY)
                        .then(results => {
                            return results.rows.find(u => u.username === username && u.password === password);
                        })
                        .catch(e => console.log(e))
                        .finally(() => pool.end)

    if (!user) throw 'Username or password is incorrect';

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });

    return {
        ...omitPassword(user),
        token
    };
}

async function getAll() {
    return pool.query(SELECT_ALL_USERS_QUERY)
                            .then(results => {
                                return results.rows.map(u => omitPassword(u));
                            })
                            .catch(e => console.log(e))
                            .finally(() => pool.end)
}

// helper functions

function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}