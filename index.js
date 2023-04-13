const express = require('express');
const app = express();
const port = 9000;

app.listen(port, (err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`); //interpolation using ` ` and ${}
    }

    console.log(`Server is running on port: ${port}`);
});