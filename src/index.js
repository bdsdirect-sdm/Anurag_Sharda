const express = require('express')
const sequel = require('./config/config');
const router = require('./router/userRouter');
const cors = require('cors')
const JWT = require("jsonwebtoken")



const app = express();
const PORT = 3001;

sequel.sync({force:false}).then(()=>{
    console.log("Databasse Connected...");
    app.listen(PORT, ()=>{
        console.log("Server connected");
        });
}
).catch(err => {
    console.log("Error: "+err);
});

app.use(cors())
app.use(express.json());
app.use('/', router);