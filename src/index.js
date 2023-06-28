
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// import cookieSession from 'cookie-session';
import sessions from 'express-session';
import cookieParser from 'cookie-parser';
import mysql from 'mysql'
import mySQLStore from 'express-mysql-session';
const MySQLStore = mySQLStore(sessions);
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
   origin: true,
   credentials: true
}))

const options = {
    host: "localhost",
    user: "root",
    password: "password",
    port: 3306,
    database: 'dbsession'
};

var sessionConnection = mysql.createConnection(options);
var sessionStore = new MySQLStore({
    expiration:  10800000,
    createDatabaseTable: true,
    schema:{
        tableName: 'sessiontbl',
        columnNames:{
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
},sessionConnection)

const fiveMins = 1000 * 60 * 5;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:false,
    cookie: { maxAge: fiveMins, sameSite: true },
    resave: false,
    store: sessionStore,
}));
// app.use(cookieSession({
//     name: 'session',
//     keys: ['key1', 'key2']
// }))

import { userRoute } from './routes/user.routes.js';

app.use('/users', userRoute);


app.listen(80, () => console.log('API is running on http://localhost:80/login'));