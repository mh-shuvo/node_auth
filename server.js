const express = require("express")
const bodyParser = require('body-parser');
const app = express();

const authRoute = require('./routes/auth');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api/users', authRoute);

app.get('/', (req, res) => {
    let data = {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 7,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    };
    res.json(data.insertId);
});



app.listen('3000', () => {
    console.log("Your searver running on the port 3000");
});