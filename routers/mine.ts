import { Router } from 'express';
import { ResourceRecord } from '../records/resource.record';

export const mineRouter = Router();

mineRouter
    .get('/', async (req, res) => {
        const currDate = new Date();
        currDate.setTime(currDate.getTime() - 300000);

        if (req.session.startedAt) {
            let startedAt = new Date(req.session.startedAt);
            if (currDate.getTime() > startedAt.getTime()) {
                req.session.startedAt = null;
                req.session.workingVillagers = 0;

                req.session.gold += req.session.minegold * 30;
                req.session.wood += req.session.minewood * 30;
                req.session.stone += req.session.minestone * 30;
                req.session.villager +=
                    Number(req.session.minegold)
                    + Number(req.session.minewood)
                    + Number(req.session.minestone);
                
                    const resourceUpdate = new ResourceRecord({
                        id: (req.session.playerid),
                        gold: (req.session.gold),
                        wood: (req.session.wood),
                        stone: (req.session.stone),
                        villager: (req.session.villager),
                        villagerlimit: (req.session.villagerlimit),
                    });

                    await resourceUpdate.update();

                res.render('mine/mine', {
                    gold: req.session.gold,
                    wood: req.session.wood,
                    stone: req.session.stone,
                    villager: req.session.villager,
                    villagerlimit: req.session.villagerlimit,
                    message: 'Your resources has been gathered.',
                })
            } else {
                res.render('mine/mine', {
                    gold: req.session.gold,
                    wood: req.session.wood,
                    stone: req.session.stone,
                    villager: req.session.villager,
                    villagerlimit: req.session.villagerlimit,
                    whenReady: new Date(startedAt.getTime() + 300000).toLocaleTimeString(),
                });
            }
        } else {
            res.render('mine/mine', {
                gold: req.session.gold,
                wood: req.session.wood,
                stone: req.session.stone,
                villager: req.session.villager,
                villagerlimit: req.session.villagerlimit,
            });
        }
    })
    .post('/', (req, res) => {
        const { minegold, minewood, minestone } = req.body;

        req.session.minegold = minegold;
        req.session.minewood = minewood;
        req.session.minestone = minestone;

        if (Number(minegold) + Number(minewood) + Number(minestone) > req.session.villager) {
            res.render('mine/notenoughvillagers')
        } else {
            req.session.villager -= Number(minegold) + Number(minewood) + Number(minestone);
            req.session.workingVillagers = Number(minegold) + Number(minewood) + Number(minestone);
            req.session.startedAt = new Date();

            res.render('mine/mine', {
                gold: req.session.gold,
                wood: req.session.wood,
                stone: req.session.stone,
                villager: req.session.villager,
                villagerlimit: req.session.villagerlimit,
                whenReady: new Date((req.session.startedAt).getTime() + 300000).toLocaleTimeString()
            });
        }
    })