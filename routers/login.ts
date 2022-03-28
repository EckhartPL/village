import { Router } from 'express';
import express from 'express';
import { PlayerRecord } from '../records/player.record';

const app = express();
export const loginRouter = Router();

loginRouter
    .get('/', (req, res) => {
        if(req.session.name) {
            res.render('login/already-logged')
        } else {
            res.render('login/login');
        }
    })

    .post('/login-check', async (req, res) => {
        const player = new PlayerRecord(req.body);

        console.log(await player.getPlayer());
        

        if (player === null) {
            res.render('error/error', {
                error: 'Invalid credentials',
            })
        }
        else {
            const resources = PlayerRecord.getResources(player.id);

            console.log(`Resources: ${resources}`);
            

            req.session.playerid = player.id;
            req.session.name = player.name;
            req.session.password = player.password;

            app.locals.id = player.id;
            app.locals.name = player.name;
            app.locals.password = player.password;

            
            res.render('login/success', {
                name: player.name,
                id: app.locals.id,
                resources,
            })
        }

    });