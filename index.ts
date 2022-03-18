import * as express from 'express';
import { homeRouter } from './routers/home';
import { villagerRouter } from './routers/villager';
import { engine } from 'express-handlebars';

const app = express();

app.use(express.urlencoded({
    extended: true,
}))
app.use(express.static('public'));
app.engine('.hbs', engine({
    extname: '.hbs',
}));
app.set('view engine', '.hbs');

app.use('/villager', villagerRouter);
app.use('/', homeRouter);

app.listen(3000, 'localhost', () => console.log(`listening on http://localhost:3000`));