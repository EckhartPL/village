import { Router } from 'express';
import { PlayerRecord } from '../records/player.record';

export const registerRouter = Router();

registerRouter
    .get('/', (req, res) => {
        if (req.session.name) {
            res.render('register/occupiedaccount', {
                gold: req.session.gold,
                wood: req.session.wood,
                stone: req.session.stone,
                villager: req.session.villager,
                villagerlimit: req.session.villagerlimit,
            })
        } else {
            res.render('register/register');
        }
    })
    .post('/', async (req, res) => {
        const register = new PlayerRecord(req.body)
        
        if (await (register.insert()) === null) {
            res.render('register/failed');
        } else {
            await register.insert();
            res.render('register/success', {
                register,
            });
        }
    })