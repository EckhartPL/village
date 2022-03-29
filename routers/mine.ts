import { Router } from 'express';

export const mineRouter = Router();

mineRouter
    .get('/', (req, res) => {
        res.render('mine/mine', {
            gold: req.session.gold,
            wood: req.session.wood,
            stone: req.session.stone,
            villager: req.session.villager,
        })
    })
    .post('/', (req, res) => {
        console.log(req.body);
        

        res.render('mine/mine', {
            gold: req.session.gold,
            wood: req.session.wood,
            stone: req.session.stone,
            villager: req.session.villager,
        })
    })