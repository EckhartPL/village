import { Router } from "express";
import { PlayerRecord } from "../records/player.record";
import Handlebars from 'handlebars';

export const profileRouter = Router();

profileRouter
    .get('/', async (req, res) => {
        const all = await PlayerRecord.list();

        console.log(req.session.name);

        const takenPlace = all
            .map((el, index) => (index + 1) + '. ' + el.name)
            .filter(el => el.includes(req.session.name))
            .map(el => el[0])
            .map(Number)[0];
            
        Handlebars.registerHelper('placeSufix', (num: number) => {
            if (String(num).endsWith('1')) {
                return 'st';
            } else if (String(num).endsWith('2')) {
                return 'nd';
            } else if (String(num).endsWith('3')) {
                return 'rd';
            } else {
                return 'th';
            }
        })

        res.render('profile/profile', {
            name: req.session.name,
            gold: req.session.gold,
            wood: req.session.wood,
            stone: req.session.stone,
            villager: req.session.villager,
            takenPlace,
        });
    })
    .post('/', async (req, res) => {
        const top = await PlayerRecord.listTop(req.body.top);

        Handlebars.registerHelper("inc", value => {
            return Number(value) + 1;
        });

        res.render('profile/top-players', {
            name: req.session.name,
            gold: req.session.gold,
            wood: req.session.wood,
            stone: req.session.stone,
            villager: req.session.villager,
            top,
        });
    })