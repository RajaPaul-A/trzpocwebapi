import { pool } from '../config/dbconfig.js';
import createError from 'http-errors';

export function getAllUsers(req, res){
    pool.getConnection(function(err, con) {
        if (err) res.send(err);
        con.query(`SELECT * FROM main.users`, function(err, result, fields) {
            if (err) res.send(err);
            if (result) res.send(result)
            else next(createError(404, 'Users not found'));
            con.release();
        });
    });
}

export function insertUser(req, res){
    pool.getConnection(function(err, con) {
        if (err) res.send(err);
        con.query(`INSERT INTO main.users (username, email, password) VALUES ('${req.body.username}', '${req.body.email}', '${req.body.password}')`, function(err, result, fields) {
            if (err) res.send(err);
            if (result) res.send({username: req.body.username, email: req.body.email});
            if (fields) console.log(fields);
            con.release();
        });
    });
}

export function validateUser(req, res, next){
    pool.getConnection(function(err, con) {
        if (err) res.send(err);
        con.query(`SELECT * FROM main.users where username = '${req.body.username}'`, function(err, result, fields) {
            if (err) res.send(err);
            if (result.length > 0) {
                let user = result[0];
                if(user.password === req.body.password){
                    let session=req.session;
                    session.isAuthenticated = true;
                    session.id = user.id;
                    session.username = user.username;
                    session.email = user.email;
                    delete user.password;
                    res.status(200).json(user);
                } else {
                    next(createError(401, 'Invalid Credentials'));
                }
            } else {
                next(createError(404, 'User not found'));
            }
            con.release();
        });
    });
}

export function logoutUser(req, res){
    let session = req.session;
    session.destroy();
    res.status(200).send("Logged out successfully");
}