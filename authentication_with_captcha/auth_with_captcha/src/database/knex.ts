import knex from "knex";
import knexconfig from "src/config/knexfile";


const db = knex(knexconfig)

export default db;