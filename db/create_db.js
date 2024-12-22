import pg from 'pg'
import dotenv from 'dotenv'
import {pipline} from 'node:stream/promises'
import fs from 'node:fs'
import{from as copyFrom} from 'pg-copy-streams'

dotenv.config();
console.log('connectiing to database..', process.env.PG_DATABASE);
const db = new pg.Pool({
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT),
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    ssl: process.env.PG_REQUIRE_SSL ? {
        rejectUnauthorized: false,
    } : undefined,

});

export default db;

const dbResult = await db.query('select now()');
console.log('Database connection established on', dbResult.rows[0].now);
await db.query(`
    drop table if exist ....

    create table ... (
    
    )
    
    
    `);

    console.log('Tables created...');
    console.log('copying into tables...');

    await copyIntoTable(db, `
        cop
        
        
        
        `);

    await db.send();
    console.log('data copied');

    async function copyIntoTables(db, sql, file) {
        const client = await db.connect();
        try {
            const ingestStream = client.query(copyFrom(sql))
            const sourceStream = fs.createReadStrean(file);
            await pipline(sourceStream, ingestStream);
        } finally {
            client.release();
        }
        
    };

    


