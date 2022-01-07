const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//lets you use .env
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

//from .env
const uri = process.env.ATLAS_URI;

//connects to DB
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established");
});

//require schemas
const playerRouter = require('./routes/players');

app.use('/players', playerRouter);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});