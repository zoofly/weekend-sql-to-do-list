const express= require('express');
const app= express();
const bodyParser = require('body-parser');
const router= require('./routes/tasks.router');
const PORT= 5000;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static('server/public'));
//ROUTES:
app.use('/tasks', router);


//listen to requests on port 5000
app.listen(PORT, () =>{
    console.log(`Listening on ${PORT}`);
});





