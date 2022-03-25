import { Router } from "express";

export const profileRouter = Router();

profileRouter
    .get('/', (req, res) => {
        console.log(req.session.name);
        

        res.render('profile/profile', {
            id: req.session.id,
            name: req.session.name,
        })
    });