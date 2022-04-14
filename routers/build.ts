import { Router } from "express";
import { ResourceRecord } from "../records/resource.record";

export const buildRouter = Router();

buildRouter
    .get('/', (req, res) => {
        res.render('build/build', {
            gold: req.session.gold,
            wood: req.session.wood,
            stone: req.session.stone,
            villager: req.session.villager,
            villagerlimit: req.session.villagerlimit,
        });
    })
    .post('/', async (req, res) => {

        if (Number(req.session.gold) >= 300 
        && Number(req.session.wood) >= 200 
        && Number(req.session.stone) >= 400) {
            req.session.villagerlimit += Number(req.body.build) * 3;

            const resourceUpdate = new ResourceRecord({
                id: (req.session.playerid),
                gold: (req.session.gold),
                wood: (req.session.wood),
                stone: (req.session.stone),
                villager: (req.session.villager),
                villagerlimit: (req.session.villagerlimit),
            });

            await resourceUpdate.update();

            res.render('build/build', {
                gold: req.session.gold,
                wood: req.session.wood,
                stone: req.session.stone,
                villager: req.session.villager,
                villagerlimit: req.session.villagerlimit,
            });
        } else {
            res.render('build/notenoughresources', {
                gold: req.session.gold,
                wood: req.session.wood,
                stone: req.session.stone,
                villager: req.session.villager,
                villagerlimit: req.session.villagerlimit,
            })
        }
    });