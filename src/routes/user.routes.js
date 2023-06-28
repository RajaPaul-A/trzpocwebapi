import { getAllUsers, insertUser, logoutUser, validateUser } from '../controllers/user.controller.js';
import express from 'express';
import createError from 'http-errors';
export const userRoute = express.Router({mergeParams: true});

const isAuthenticated = (req, res, next) => {
    if(req.session.isAuthenticated){
        next();
    } else {
        next(createError(440, 'Session Expired'));
    }
}

userRoute.get('/all', isAuthenticated, getAllUsers);
userRoute.post('/add', insertUser);
userRoute.post('/', validateUser);
userRoute.delete('/logout', logoutUser);
userRoute.get('/',() => {res.send("Welcome...")});