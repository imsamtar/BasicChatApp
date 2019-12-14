import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import mongoose from 'mongoose';
import {mongoLink} from '../.env/index';

mongoose.connect(mongoLink, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
}, (err) => console.log(err?err:'Connected to database'));

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = new express();

app.use(
	express.json({ extended: true }),
	compression({ threshold: 0 }),
	express.static('static', { dev }),
	sapper.middleware()
);

app.listen(PORT, err => {
	if (err) console.log('error', err);
});
