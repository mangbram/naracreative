const express =require('express');
const app = express();
const bp = require('body-parser');
const router = require('./routes');
const { databaseConfig } = require('./database');
require('dotenv').config();
const cors = require("cors")

app.use(bp.json());
app.use(bp.urlencoded({extended:true}));
app.use(cors({
    origin: "*",
}))
databaseConfig.connect((err)=>{
    if(err){
        console.log(err)
        return
    }
    DATABASE = process.env.DATABASE
    console.log(`Connected to database ${DATABASE}`)
})
app.use(express.Router());
app.use('/', router);

app.get('/', async (req,res)=>{
    try{
        res.send(`Welcome Page`)
    } catch(err){
        console.log(err);
    }
})

PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{console.log(`Application is running on ${PORT}!!`)})
