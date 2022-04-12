import { Router } from "express";
import { PlayerRecord } from "../records/player.record";

export const profileRouter = Router();

profileRouter
    .get('/', async (req, res) => {

        const top = await PlayerRecord.listTop(10);
        console.log(top[0]);
        

        res.render('profile/profile', {
            name: req.session.name,
            gold: req.session.gold,
            wood: req.session.wood,
            stone: req.session.stone,
            villager: req.session.villager,
            top,
        })
    });