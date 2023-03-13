require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json())
let cors = require("cors");
app.use(cors());
const CONNECTION = require('./Database/Db')
CONNECTION()


const ADMIN = require('./routes/Admin')
const USER = require('./routes/User')

app.use('/admin',ADMIN);
app.use('/user', USER);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get("/health", (_, res)=>{
    res.send({
        status: "server is healthy", 
        Time: new Date()
    });
});

app.use((req, res, next)=>{
    res.status(400).send('enter valid url')
    next()
})
  
app.use((req, res, next)=>{
    res.status(500).send('something went wrong')
    next()
})

port=process.env.PORT
host=process.env.HOST
app.listen(port, () => {
    console.log(`app is running at http://${host}:${port}`);
});