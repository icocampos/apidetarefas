import { Pool } from 'pg';

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'ic2150',
    database: 'tarefasapi',
    port: 5432
});