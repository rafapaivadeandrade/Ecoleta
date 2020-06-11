import {Request, Response} from 'express';
import knex from '../database/connection';

class pointscontroller {
    async index(req:Request,res:Response){
        const { city, province, items} = req.query;

        const parsedItems = String(items)
        .split(',')
        .map(item =>   Number(item.trim()));

        const points = await knex('point')
        .join('point_items','point.id','=','point_items.point_id')
        .whereIn('point_items.item_id',parsedItems)
        .where('city',String(city))
        .where('province',String(province))
        .distinct()
        .select('point.*');

        const serializedPoints = points.map(point=> {
            return {
               ...point,
                image_url: `http://192.168.1.69:3333/assets/${point.image}`
        };
        });

        return res.json(serializedPoints);
    }
  

    async show(req:Request,res:Response){
        const {id} = req.params;

        const point = await knex('point').where('id',id).first();

        if(!point){
            return res.status(400).json({message: 'Point not found'});
        }

        const serializedPoint = {
           
               ...point,
                image_url: `http://192.168.1.69:3333/assets/${point.image}`
        
        };

        const items = await knex('items')
        .join('point_items','items.id','=','point_items.item_id')
        .where('point_items.point_id',id)
        .select('items.title');

        return res.json({point: serializedPoint,items});
    }
    async create(request: Request,response: Response){
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            province,
            items
        } = request.body;
        const trx = await knex.transaction();
        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            province
            }
    const ids = await trx('point').insert(point);

    const point_id = ids[0]
    const pointItems =  items.split(',').map((item: string) => Number(item.trim())).map((item_id : number) => {

        return{
            item_id ,
            point_id,
    }
    })
    await trx('point_items').insert(pointItems);
    await trx.commit();

    return response.json({
        id: point_id,
        ...point
    })    
    }
}

export default pointscontroller;