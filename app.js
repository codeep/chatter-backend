import express from 'express'
import bodyParser from 'body-parser'
import unless from 'express-unless'

const app = express();

import AuthMiddleware from './middleware/AuthMiddleware'
import ErrorMiddleware from './middleware/ErrorMiddleware'

import auth from './routes/auth'
import msg from './routes/msg'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(AuthMiddleware.unless({ path: /^\/auth./ }))

app.use('/auth', auth);
app.use('/msg', msg);

app.use(ErrorMiddleware);

export default app
