
const express= require('express');
const router = express.Router();
const pg = require('pg');

//Creating a connection to our database
const Pool = pg.Pool;
const config = {
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 3000
};

const pool = new Pool(config);

pool.on('connect', () =>{
    console.log('Connected to weekend-to-do-app database');
});

pool.on ('error', () =>{
    console.log("Couldn't connect to database");
});


router.get('/', (req,res) =>{
    let tasksList= 'SELECT * FROM tasks;';
    pool.query(tasksList).then ((result) => {
        res.send(result.rows);
    }) .catch ((error => {
        console.log('Error in getting tasks from database', error);
        res.sendStatus(500);
    }));
})


module.exports = router;