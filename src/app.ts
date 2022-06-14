import bodyParser from 'body-parser';
import express from 'express'
import { router } from './routes'
import cron from 'node-cron'
import { PostgresCompTimeRepository } from './repositories/implementations/CompTimeImplementations/PostgresCompTimeRepository';

const app = express()
app.use(bodyParser.urlencoded({
  extended: false
}));
cron.schedule('0 0 12 1 1/1 ? *', () => {
  new PostgresCompTimeRepository().calculateCompTimeHours();
});
app.use(bodyParser.json());
app.use(express.json())
app.use(express.static('./upload'));
app.use(router)

export { app }