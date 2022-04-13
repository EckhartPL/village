import { Router } from "express";
import { ResourceRecord } from "../records/resource.record";
import Handlebars from 'handlebars';

export const recruitRouter = Router();

recruitRouter
    .get('/', (req, res) => {
        res.render('recruit/recruit', {
            gold: req.session.gold,
            wood: req.session.wood,
            stone: req.session.stone,
            villager: req.session.villager,
            villagerlimit: req.session.villagerlimit,
        });
    })
    .post('/', async (req, res) => {
        Handlebars.registerHelper('howMuchWorking', (num: number) => {
            if (num === 1) {
                return 'One villager is currently working.';
            } else {
                return num + ' villagers are currently working.';
            }
        });

        if ((req.body.recruit * 100) > Number(req.session.gold)) {
            res.render('recruit/notenoughgold', {
                gold: req.session.gold,
                wood: req.session.wood,
                stone: req.session.stone,
                villager: req.session.villager,
                villagerlimit: req.session.villagerlimit,
            });
        } else if (Number(req.session.villager) === Number(req.session.villagerlimit)) {
            res.render('recruit/villagerlimitreached', {
                gold: req.session.gold,
                wood: req.session.wood,
                stone: req.session.stone,
                villager: req.session.villager,
                villagerlimit: req.session.villagerlimit,
            });
        } else if (Number(req.body.recruit) + Number(req.session.villager) > Number(req.session.villagerlimit)) {
            res.render('recruit/notenoughspace', {
                gold: req.session.gold,
                wood: req.session.wood,
                stone: req.session.stone,
                villager: req.session.villager,
                villagerlimit: req.session.villagerlimit,
            });
        } else if (Number(req.session.workingVillagers) + Number(req.body.recruit) + Number(req.session.villager) > Number(req.session.villagerlimit)) {
            res.render('recruit/notenoughspace', {
                gold: req.session.gold,
                wood: req.session.wood,
                stone: req.session.stone,
                villager: req.session.villager,
                villagerlimit: req.session.villagerlimit,
                workingVillager: req.session.workingVillagers,
            });
        } else {
            req.session.villager = Number(req.session.villager) + Number(req.body.recruit);
            req.session.gold -= (req.body.recruit * 100);

            const resourceUpdate = new ResourceRecord({
                id: (req.session.playerid),
                gold: (req.session.gold),
                wood: (req.session.wood),
                stone: (req.session.stone),
                villager: (req.session.villager),
                villagerlimit: (req.session.villagerlimit),
            });

            await resourceUpdate.update();

            res.render('recruit/recruit', {
                gold: req.session.gold,
                wood: req.session.wood,
                stone: req.session.stone,
                villager: req.session.villager,
                villagerlimit: req.session.villagerlimit,
            });
        }
    });