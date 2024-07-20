import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
const routes = require('./routes/index')

const MongoUrl = 'mongodb://localhost:27017/stock-data';

mongoose.connect(MongoUrl)
  .then(() => console.log("Connected successfully"))
  .catch(err => console.log(err));

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Remove trailing slash
  methods: 'GET,POST,PUT,DELETE', // Allow these methods
  allowedHeaders: 'Content-Type,Authorization' // Allow these headers
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes); // Routes should be defined after middleware

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
