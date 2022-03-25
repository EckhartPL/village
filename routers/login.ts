import { Router } from 'express';
import { PlayerRecord } from '../records/player.record';

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
            req.session;
            
            if (req.session.viewCount) {
                req.session.viewCount++;
            } else {
                req.session.viewCount = 1;
            }

            console.log(req.session.viewCount);
            
            res.render('login/success', {
                name,
                password,
            })
        }

    });