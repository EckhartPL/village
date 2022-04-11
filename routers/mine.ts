import { Router } from 'express';

export const mineRouter = Router();

mineRouter
    .get('/', (req, res) => {
        const currDate = new Date();
        currDate.setTime(currDate.getTime() - 60000);

        if (req.session.startedAt) {
            let startedAt = new Date(req.session.startedAt);
            if (currDate.getTime() > startedAt.getTime()) {
                req.session.startedAt = null;
                req.session.counter = 0;
                req.session.gold += req.session.minegold * 30;
                req.session.wood += req.session.minewood * 30;
                req.session.stone += req.session.minestone * 30;
                req.session.villager += Number(req.session.minegold)
                    + Number(req.session.minewood)
                    + Number(req.session.minestone);

                res.render('mine/mine', {
                    gold: req.session.gold,
                    wood: req.session.wood,
                    stone: req.session.stone,
                    villager: req.session.villager,
                    message: 'Your resources has been gathered.',
                    
                })
            } else {
                res.render('mine/mine', {
                    gold: req.session.gold,
                    wood: req.session.wood,
                    stone: req.session.stone,
                    villager: req.session.villager,
                    whenReady: Number(req.session.counter),
                });
            }
        } else {
            res.render('mine/mine', {
                gold: req.session.gold,
                wood: req.session.wood,
                stone: req.session.stone,
                villager: req.session.villager,
            });
        }
    })
    .post('/', (req, res) => {
        console.log(req.body);

        const { minegold, minewood, minestone } = req.body;

        req.session.minegold = minegold;
        req.session.minewood = minewood;
        req.session.minestone = minestone;

        if (Number(minegold) + Number(minewood) + Number(minestone) > req.session.villager) {
            res.render('mine/notenoughvillagers')
        } else {
            req.session.villager -= Number(minegold) + Number(minewood) + Number(minestone);
            req.session.startedAt = new Date();
            req.session.counter = 10;

            setInterval(() => req.session.counter++, 1000)

            res.render('mine/mine', {
                gold: req.session.gold,
                wood: req.session.wood,
                stone: req.session.stone,
                villager: req.session.villager,
            });
        }
    })