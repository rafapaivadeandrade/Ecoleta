import {Response , Request} from 'express';
import knex from '../database/connection';

class itemscontroller{
    async index(req:Request,res:Response){
        const items =  await knex('items').select('*');

        const serializedItems = items.map(item=> {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://192.168.1.69:3333/assets/${item.image}`
        };
        });
    
        return res.json(serializedItems);
    }
}

export default itemscontroller;