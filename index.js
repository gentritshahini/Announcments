const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());


const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    password: '123456',
    host: 'localhost',
    port: 5432,
    database: 'announcments'
})

const SELECT_ALL_ANNOUNCMENTS_QUERY = 'SELECT * FROM announcments'



app.get('/', (req, res) => {
    res.send('hello from the server')
})

app.get('/announcments', (req, res) => {
    res.send('hello from the server')
})

app.listen(4000, () =>{
    console.log(`Product listening in port 4000`)
})






// client.connect()
// .then(() => console.log('Connected'))
// .then(() => client.query('select * from announcments'))
// .then(results => console.table(results.rows))
// .catch(e => console.log(e))
// .finally(() => client.end)