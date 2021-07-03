const express= require('express');
const app= express();
const PORT= 5000;
const pg = require('pg');

//Creating a connection to our database
const Pool = pg.Pool;
const pool = new Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 3000
});

pool.on('connect', () =>{
    console.log('Connected to weekend-to-do-app database');
});

pool.on ('error', () =>{
    console.log("Couldn't connect to database", error);
})


app.use(express.static('server/public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.listen(PORT, () =>{
    console.log(`Listening on ${PORT}`);
});


app.get('/', (req,res) =>{
    let queryText= 'SELECT * FROM tasks;';

    pool.query(queryText).then (result => {
        res.send(result.rows);
    }) .catch (error =>{
        console.log('Error in getting tasks from database', error);
        res.sendStatus(500);
    });
})


