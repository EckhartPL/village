import { Router } from 'express';
import { PlayerRecord } from '../records/player.record';
import * as session from 'express-session';

export const loginRouter = Router();

loginRouter
    .get('/', (req, res) => {
        res.render('login/login');
    })

    .post('/login-check', async (req, res) => {
        const { name, password } = req.body;

        const player = await (PlayerRecord.getOne(name, password));

        if (player === null) {
            res.render('error/error', {
                error: 'Invalid credentials',
            })
        } 
        else {
            res.render('login/success', {
                name,
                password,
            })
        }

    });