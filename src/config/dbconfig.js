import mysql from 'mysql';

export const pool = mysql.createPool({
    // host: "database-1-instance-1.csirhi61bnj1.eu-north-1.rds.amazonaws.com",
    // user: "admin",
    // password: "Austin$062011"
    host: "localhost",
    user: "root",
    password: "password",
    port: 3306
});

// con.connect(function(err) {
//     if (err) throw err;

//     con.query('CREATE DATABASE IF NOT EXISTS main;');
//     con.query('USE main;');
//     con.query('CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT, username varchar(30), password varchar(30), email varchar(255), PRIMARY KEY(id), UNIQUE KEY(username));', function(error, result, fields) {
//         console.log(result);
//     });
//     con.end();
// });