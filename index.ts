import express from 'express';
import session from 'express-session';
import { engine } from 'express-handlebars';
import path from 'path';

import { homeRouter } from './routers/home';
import { registerRouter } from './routers/register';
import { mineRouter } from './routers/mine';
import { loginRouter } from './routers/login';
import { profileRouter } from './routers/profile';
import { logoutRouter } from './routers/logout';
import { recruitRouter } from './routers/recruit';
import { buildRouter } from './routers/build';

const app = express();

app.use(session({
	secret: 'RainbowChestsAreSuperior',
	resave: false,
	saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24},
}));
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.static('public'));
app.engine('.hbs', engine({
    extname: '.hbs',
    partialsDir: path.join(__dirname, 'views/partials'),
    helpers: {
        deleteInterval: (interval: NodeJS.Timer)  => {
            clearInterval(interval);
        }
    }
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/profile', profileRouter);
app.use('/build', buildRouter);
app.use('/mine', mineRouter);
app.use('/recruit', recruitRouter)

app.listen(3000, '0.0.0.0', () => console.log(`listening on http://localhost:3000`));