const express= req('express');
const app= express();
const PORT= 5000;

app.use(express.static('server/public'));

app.listen(PORT, () =>{
    console.log(`Listening on $${PORT}`);
})