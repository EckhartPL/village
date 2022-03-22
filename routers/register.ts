import { Router } from 'express';
import { PlayerRecord } from '../records/player.record';

export const registerRouter = Router();

registerRouter
    .get('/', (req, res) => {
        res.render('register/register');
    })

    .post('/register-success', (req, res) => {
        const register = new PlayerRecord(req.body)
        register.insert();
        
        res.render('register/success', {
            register,
        });
    })