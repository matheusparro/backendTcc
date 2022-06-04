import bodyParser from 'body-parser';
import express from 'express'
import { router } from './routes'

const app = express()
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.json())
app.use(express.static('./upload'));
app.use(router)

export { app }