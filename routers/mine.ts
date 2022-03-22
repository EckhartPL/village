import {Router} from 'express';
import { ResourceRecord } from '../records/resource.record';

export const mineRouter = Router();

mineRouter
    .post('/', (req, res) => {
        const resource = new ResourceRecord(req.body);

        console.log(resource);
        res.render('mine/mine', {
            resource,
        });
    })