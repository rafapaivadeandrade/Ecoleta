import Knex from 'knex';

export async function up(knex: Knex){
    //Create table
   return knex.schema.createTable('items',table=>{
        table.increments('id').primary();
        table.integer('image').notNullable();
        table.integer('title').notNullable();
        
    })
}
export async function down(knex:Knex){
    //Delete table
    return knex.schema.dropTable('items');
}