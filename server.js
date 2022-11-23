const express = require("express")
const bodyParser = require('body-parser');
const app = express();

const authRoute = require('./routes/auth');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api/users', authRoute);

app.get('/', index);

const index = (req, res) => {
    res.json({
        "name":"MD. Mehedi Hasan",
        "designation":"Senior Software Engineer/ Software Architect"
    })
}
export {index}


app.listen('3000', () => {
    console.log("Your searver running on the port 5000");
});