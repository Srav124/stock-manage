import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

const routes = require('./routes/index');

const MongoUrl = 'mongodb://localhost:27017/stock-data';

mongoose.connect(MongoUrl).then((res) =>  console.log("Connected successfully")).catch(((err) => console.log(err)))

const app = express();

const router = express.Router()

app.use('/', routes)

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});