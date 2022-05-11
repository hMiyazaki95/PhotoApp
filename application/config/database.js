

// this creates connection of mysql
const mysql = require("mysql2");

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'csc317db',
    password: '1234567890' // my password
});

//module.exports = db.promise();
//module.exports = db;

// after add this add app.get() in the app.js
module.exports = db.promise(); // promise based mysql connections
