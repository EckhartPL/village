import { Router } from "express";

export const logoutRouter = Router();

logoutRouter

.get('/', (req, res) => {
    req.session = null;

    res.render('logout/logout');
})