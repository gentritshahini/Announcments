const config = require('config.json');
const jwt = require('jsonwebtoken');

const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    password: '123456',
    host: 'localhost',
    port: 5432,
    database: 'announcments'
})

client.connect()

const SELECT_ALL_USERS_QUERY = 'SELECT * FROM users'

module.exports = {
    authenticate,
    getAll
};


async function authenticate({ username, password }) {

    const user = client.query(SELECT_ALL_USERS_QUERY)
                        .then(results => {
                            return results.rows.find(u => u.username === username && u.password === password);
                        })
                        .catch(e => console.log(e))
                        .finally(() => client.end)

    if (!user) throw 'Username or password is incorrect';

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });

    return {
        ...omitPassword(user),
        token
    };
}

async function getAll() {
    return client.query(SELECT_ALL_USERS_QUERY)
                            .then(results => {
                                return results.rows.map(u => omitPassword(u));
                            })
                            .catch(e => console.log(e))
                            .finally(() => client.end)
}

// helper functions

function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}