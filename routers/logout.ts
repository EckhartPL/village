import { Router } from "express";

export const logoutRouter = Router();

logoutRouter

.get('/', (req, res) => {
    req.session.destroy(() => {
        console.log(`User logged out.`);
    });

    res.render('logout/logout');
})