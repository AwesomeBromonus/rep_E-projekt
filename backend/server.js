import express from 'express';
import pg from "pg";
import dotenv from 'dotenv';

dotenv.config();
console.log('Connecting to database...');

const db = new pg.pool({
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT),
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    ssl: process.env.PG_REQUIRE_SSL ? {
        rejectUnauthorized: false,
    }: undefined,
});

try { 
    const dbResult = await db.query('select now() as now');
    console.log('Database connection established on', dbResult.rows[0].now);
    } catch (err) {
        console.error('Database connection error', err);
    }

    const port = process.env.Port || 3000;
    const server = express();

server.use(express.static('frontend'));
server.use((req,res,next)=>{console.log(new Date(), req.method, req.url); 
    next();
});


server.get('api/Elisa_music', async (req,res) => {
    try{
        const dbResult = await db.query(`
            select * from Elisa_music 
            `);

    }catch (err) {
        console.log( 'error fetching data from the database')
    }
});