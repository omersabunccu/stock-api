const morgan = require('morgan');
const fs = require('fs');

const [date, time] = new Date().toISOString().split('T')

module.exports = morgan('combined', {
    stream: fs.createWriteStream(`./logs/${date}.log`, {flags:'a+'})
})