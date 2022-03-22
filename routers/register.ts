import { Router } from 'express';

export const registerRouter = Router();

registerRouter
    .get('/', (req, res) => {
        res.render('register/register');
    })
    .post('/', (req, res) => {
        res.render('register/success');
    })