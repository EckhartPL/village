import { Router } from "express";

export const recruitRouter = Router();

recruitRouter
    .get('/', (req, res) => {

        res.render('recruit/recruit', {
            gold: req.session.gold,
            wood: req.session.wood,
            stone: req.session.stone,
            villager: req.session.villager,
        });
    })
    .post('/', (req, res) => {

        res.render('recruit/recruit', {
            gold: req.session.gold,
            wood: req.session.wood,
            stone: req.session.stone,
            villager: req.session.villager,
        });
    });