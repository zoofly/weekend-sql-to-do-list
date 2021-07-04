const express= require('express');
const app= express();
const bodyParser = require('body-parser');
const tasksRouter= require('./routes/tasks.router');
const PORT= 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


//ROUTES:
app.use('/tasks', tasksRouter);


//listen to requests on port 5000
app.listen(PORT, () =>{
    console.log(`Listening on ${PORT}`);
});





