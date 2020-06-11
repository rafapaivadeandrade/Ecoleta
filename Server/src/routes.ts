import express from 'express';
import multer from 'multer';
import multerconfig from '../config/multer';
import Pointscontroller from './controllers/pointscontroller';
import Indexcontroller from './controllers/itemscontroller';
import {celebrate,Joi} from 'celebrate';

const routes = express.Router();
const upload = multer(multerconfig);
const pointscontroller = new Pointscontroller();
const itemscontroller = new Indexcontroller();

routes.get('/items',itemscontroller.index);

// routes.post('/points',pointscontroller.create);

routes.get('/points/:id',pointscontroller.show);
routes.get('/points',pointscontroller.index);

routes.post('/points',
upload.single('image'),
celebrate(
{
 body: Joi.object().keys({
     name: Joi.string().required(),
     email: Joi.string().required().email(),
    whatsapp: Joi.number().required(),
    latitude:Joi.number().required(),
    longitude:Joi.number().required(),
    city:Joi.string().required(),
    province:Joi.string().required().max(2),
    items:Joi.string().required(),
 }) ,}, {abortEarly:false}),pointscontroller.create);

export default routes;