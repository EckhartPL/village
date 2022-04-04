import { Router } from "express";

export const profileRouter = Router();

profileRouter
    .get('/', (req, res) => {
        console.log(req.session.gold);


        res.render('profile/profile', {
            id: req.session.id,
            name: req.session.name,
            gold: req.session.gold,
            wood: req.session.wood,
            stone: req.session.stone,
            villager: req.session.villager,
        })
    });