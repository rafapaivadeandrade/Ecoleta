import Knex from 'knex';

export async function seed(knex:Knex){
   await knex('items').insert(
        [
            {title:'Lamps',image: 'lamps.svg'},
            {title:'Batteries and Chargers',image: 'battery.svg'},
            {title:'Papers and Cardboard',image: 'papers-cardboard.svg'},
            {title:'Electronic Waste',image: 'electronic.svg'},
            {title:'Organic Waste',image: 'organic.svg'},
            {title:'Kitchen Oil',image: 'oil.svg'},

        ]
    );
}