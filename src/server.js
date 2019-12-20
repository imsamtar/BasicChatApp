import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { verify } from './routes/api/users/me/_verify.js';

dotenv.config();

const { PORT, NODE_ENV, dblink } = process.env;
const dev = NODE_ENV === 'development';

mongoose.connect(dblink, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
}, (err) => console.log(err?err:'Connected to database'));

const app = new express();

app.use('/api/users/me/', verify);

app.use(
	express.json({ extended: true }),
	compression({ threshold: 0 }),
	express.static('static', { dev }),
	sapper.middleware()
);

app.listen(PORT, err => {
	if (err) console.log('error', err);
});
