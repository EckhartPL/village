import { Router } from 'express';
import { pool } from '../utils/db';

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

        const { minegold, minewood, minestone } = req.body;

        if (minegold + minewood + minestone > req.session.villager) {
            res.render('mine/notenoughvillagers')
        } else {
            req.session.villager -= minegold + minewood + minestone;
            req.session.gold = minegold * 30;
            req.session.wood = minewood * 30;
            req.session.stone = minestone * 30;

            setTimeout(() => {
                req.session.villager += minegold + minewood + minestone;
            }, 5000)

            res.render('mine/mine', {
                gold: req.session.gold,
                wood: req.session.wood,
                stone: req.session.stone,
                villager: req.session.villager,
            })
        }
    })