import * as express from 'express';
import { engine } from 'express-handlebars';
import { homeRouter } from './routers/home';
import { registerRouter } from './routers/register';
import { mineRouter } from './routers/mine';
import { loginRouter } from './routers/login';
import * as session from 'express-session';

const app = express();

app.use(session({
	secret: 'RainbowChestsAreSuperior',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.static('public'));
app.engine('.hbs', engine({
    extname: '.hbs',
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/mine', mineRouter);

app.listen(3000, 'localhost', () => console.log(`listening on http://localhost:3000`));