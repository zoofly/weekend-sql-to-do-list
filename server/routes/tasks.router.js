
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

//GET ROUTE
router.get('/', (req,res) =>{
    let tasksList= `SELECT * FROM tasks;`;
    pool.query(tasksList)
    .then ((dbResponse) => {
        res.send(dbResponse.rows);
    }) .catch ((error => {
        console.log('Error in getting tasks from database', error);
        res.sendStatus(500);
    }));
})


//POST
router.post('/', (req,res) => {
    console.log('From the server', req.body);
    const newTask= req.body;
    const taskList = `
    INSERT INTO tasks (task, complete)
    VALUES ($1, $2);`;
    pool.query(taskList, [newTask.task, false])
    .then((dbResponse) => {
        res.sendStatus(201);
    }) .catch( err => {
        console.log('Error in posting to server', err);
        res.sendStatus(500);
    });

});

//PUT
router.put('/:id', (req,res) => {
    const taskId= req.params.id;
    const queryText= `UPDATE tasks
    SET "complete" = 'true' 
    WHERE "id" =$1 ;`;
    pool.query(queryText, [taskId]) 
    .then ((dbResponse) =>{
        console.log('Updated task status', dbResponse);
        res.sendStatus(200);
    }) .catch ((err) =>{
        console.log('error updating task', err);
        res.sendStatus(500);
    });
});


//DELETE
router.delete('/:id', (req,res) => {
    const taskId = req.params.id;
    console.log(`Task ID is ${taskId}`);
    const queryText = `
    DELETE FROM tasks
    WHERE id=$1;`;
    pool.query (queryText, [taskId])
    .then((dbResponse)=>{
        console.log(`${dbResponse.rowCount === 1} deleted`);
        res.sendStatus(200);
    }) .catch (err =>{
        console.log(`Unable to delete task ${taskId}`, err);
        res.sendStatus(500);
    });
});


module.exports = router;