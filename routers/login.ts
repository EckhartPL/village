import { Router } from 'express';
import express from 'express';
import { PlayerRecord } from '../records/player.record';

const app = express();
export const loginRouter = Router();

loginRouter
    .get('/', (req, res) => {
        // if(req.session) {
        //     res.send('You are already logged in.');
        // } else {
        //     res.render('login/login');
        // }

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
            req.session.playerid = player.id;
            req.session.name = player.name;
            req.session.password = player.password;

            app.locals.id = player.id;
            app.locals.name = player.name;
            app.locals.password = player.password;

            
            res.render('login/success', {
                name,
            })
        }

    });