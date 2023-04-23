const express = require('express');
const app = express();
const port = 9000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');


app.use(express.static('./assets'));


app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set("layout extractStyles",true);
app.set("layout extractScripts", true)


//use express router
app.use('/', require('./routes/index'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, (err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`); //interpolation using ` ` and ${}
    }

    console.log(`Server is running on port: ${port}`);
});