import Knex from 'knex';

export async function up(knex: Knex){
    //Create table
   return knex.schema.createTable('point',table=>{
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('province',2).notNullable();
    })
}
export async function down(knex:Knex){
    //Delete table
    return knex.schema.dropTable('point');
}