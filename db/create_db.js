import pg from 'pg'
import dotenv from 'dotenv'
import {pipeline} from 'node:stream/promises'
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
    drop table if exists Elisa_music;

    create table Elisa_music (
    Artist text,
    Title text,
    Year integer
    )
    
    
    `);

    console.log('Tables created...');
    console.log('copying into tables...');

    await copyIntoTable(db, `
        copy Elisa_music (Artist,Title,Year)
        from stdin
        with csv header`, 'db/Elisa_music.csv'); 

    await db.end();
    console.log('data copied');

    async function copyIntoTable(db, sql, file) {
        const client = await db.connect();
        try {
            const ingestStream = client.query(copyFrom(sql))
            const sourceStream = fs.createReadStream(file);
            await pipeline(sourceStream, ingestStream);
        } finally {
            client.release();
        }
    };
    

    


