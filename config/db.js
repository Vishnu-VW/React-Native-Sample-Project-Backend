const mysql = require('mysql2')

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Apple#123',
    database : 'mobile_app'
});

db.connect(err => {
    if (err){
        throw err;
    }
    console.log('MYSQL Connected....')
})


module.exports = db;