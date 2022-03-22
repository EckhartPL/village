import { Router } from "express";

export const homeRouter = Router();

homeRouter
    .get('/', (req, res) => {
        const {gold, wood, stone, villagers} = req.body;

        res.render('home', {
            gold, wood, stone, villagers
        });
    })