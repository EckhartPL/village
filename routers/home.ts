import { Router } from "express";

export const homeRouter = Router();

homeRouter
    .get('/', (req, res) => {
        res.render('home', {
            gold: req.session.gold,
            wood: req.session.wood,
            stone: req.session.stone,
            villager: req.session.villager,
        });
    })