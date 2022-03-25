import { Router } from "express";

export const profileRouter = Router();

profileRouter
    .get('/', (req, res) => {
        const viewCount = req.session.viewCount;

        res.render('profile/profile', {
            viewCount,
            id: req.session.id,
        })
    });