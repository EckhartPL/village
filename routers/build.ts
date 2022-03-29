import { Router } from "express";

export const buildRouter = Router();

buildRouter
.get('/', (req, res) => {
    res.render('build/build', {
        gold: req.session.gold,
        wood: req.session.wood,
        stone: req.session.stone,
        villager: req.session.villager,
    });
})