const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json()); // Important for req.body!
