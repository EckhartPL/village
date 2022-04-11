import { Router } from 'express';

export const mineRouter = Router();

mineRouter
    .get('/', (req, res) => {
        console.log('----------------------------------------------------');
        
        const currDate = new Date();

        console.log(`currDate: ${currDate}.`);
        currDate.setTime(currDate.getTime() - 5000);
        console.log(`req.session.startedAt: ${req.session.startedAt},\ncurrDate: ${currDate}`);

        const startedAt: Date = new Date(req.session.startedAt);

        if (req.session.startedAt) {
            console.log('test1');

            if (currDate.getTime() > startedAt.getTime()) {
                console.log('test2');
                req.session.gold += req.session.minegold * 30;
                req.session.wood += req.session.minewood * 30;
                req.session.stone += req.session.minestone * 30;
                req.session.villager += Number(req.session.minegold)
                    + Number(req.session.minewood)
                    + Number(req.session.minestone);

                console.log
                    (`
                Villagers: ${req.session.villager}\n
                Gold: ${req.session.gold}\n
                Wood: ${req.session.wood}\n
                Stone: ${req.session.stone}
                `);

                res.render('mine/mine', {
                    gold: req.session.gold,
                    wood: req.session.wood,
                    stone: req.session.stone,
                    villager: req.session.villager,
                    message: 'Your resources has been gathered.',
                })
            }
        } else {
            res.render('mine/mine', {
                gold: req.session.gold,
                wood: req.session.wood,
                stone: req.session.stone,
                villager: req.session.villager,
            })
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

            res.render('mine/mine', {
                gold: req.session.gold,
                wood: req.session.wood,
                stone: req.session.stone,
                villager: req.session.villager,
            });
        }
    })