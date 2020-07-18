const config = require('config.json');
const jwt = require('jsonwebtoken');

const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    password: '123456',
    host: 'localhost',
    port: 5432,
    database: 'announcments'
})

const SELECT_ALL_USERS_QUERY = 'SELECT * FROM users'

// client.connect()
// .then(() => client.query(SELECT_ALL_USERS_QUERY))
// .then(results => {
//     users = results.rows
// })
// .catch(e => console.log(e))
// .finally(() => client.end)

// users hardcoded for simplicity, store in a db for production applications
// const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

module.exports = {
    authenticate,
    getAll
};


async function authenticate({ username, password }) {
    client.connect()
    .then(() => client.query(SELECT_ALL_USERS_QUERY))
    .then(results => {
        users = results.rows
        const user = users.find(u => u.username === username && u.password === password);
        console.log(users)
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
    return users.map(u => omitPassword(u));
}

// helper functions

function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}