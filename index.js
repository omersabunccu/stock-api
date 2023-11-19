const express = require('express');
const app = express();

// get env variables to process.env
require('dotenv').config({path:'./config/.env'})
// asyncErrors to errorHandler 
require('express-async-errors');
require('colors');

// Configurations
const PORT = process.env?.PORT || 8080
const HOST = process.env?.HOST || '127.0.0.1'
const MODE = process.env?.MODE || 'production'

// Connect DB 
require('./config/db')()

// Accept json() request 
app.use(express.json())

app.use(express.static('public'))
// Authentication
app.use(require('./middlewares/auth'));


// Run Logger 
app.use(require('./middlewares/logger'));
// res.getModelList() Advanced search, sort, pagination 
app.use(require('./middlewares/query'))

// Home page
app.all('/', require('./middlewares/homeRoute'))

// Routes 
app.use('/api', require('./routes'))



// Error Handler 
const {errorHandler} = require('./middlewares/errorHandler')
app.use(errorHandler)

app.listen(PORT, console.log(`Server running on ${MODE} mode at http://${HOST}:${PORT}`.green.underline))