import { Router } from 'express';
import { VillagerRecord } from '../records/villager.record'

export const villagerRouter = Router();

villagerRouter
    .post('/villager-added', (req, res) => {
        const {name, vitality, strength, defence} = req.body;
        console.log(req.body);

        const villager = new VillagerRecord({name, vitality, strength, defence});
        console.log(villager);
        villager.insert();
        res.send(villager);
    })