import { Router } from 'express';
import express from 'express';
import { PlayerRecord } from '../records/player.record';
import { ResourceRecord } from '../records/resource.record';

const app = express();
export const loginRouter = Router();

loginRouter
    .get('/', (req, res) => {
        if (req.session.name) {
            res.render('login/already-logged')
        } else {
            res.render('login/login');
        }
    })

    .post('/login-check', async (req, res) => {
        const player = new PlayerRecord(req.body);

        if (await (player.getOne()) === null) {
            res.render('error/error', {
                error: 'Invalid credentials',
            })
        }
        else {
            const { id: playerId } = await player.getOne();
            
            const {gold, wood, stone, villager} = await ResourceRecord.getOne(playerId);

            //console.log(`Resources: ${villager}, id: ${playerId}`);

            req.session.playerid = playerId;
            req.session.name = player.name;
            req.session.password = player.password;

            req.session.gold = gold;
            req.session.wood = wood;
            req.session.stone = stone;
            req.session.villager = villager;

            app.locals.id = playerId;
            app.locals.name = player.name;
            app.locals.password = player.password;


            res.render('login/success', {
                name: player.name,
                id: app.locals.id,
                gold,
                wood,
                stone,
                villager,
            })
        }

    });