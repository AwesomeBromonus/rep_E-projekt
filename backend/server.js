import express from 'express';
import pg from "pg";
import dotenv from 'dotenv';


dotenv.config();
console.log('Connecting to database...');

const db = new pg.Pool({
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT, 10),
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    ssl: process.env.PG_REQUIRE_SSL ? {
        rejectUnauthorized: false,
    }: undefined,
});

async function startServer(){
try { 
    const dbResult = await db.query('select now() as now');
    console.log('Database connection established on', dbResult.rows[0].now);
    } catch (err) {
        console.error('Database connection error', err);
    }

    const port = process.env.PORT|| 3001;
    const server = express();

server.use(express.static('frontend'));
server.use((req,res,next)=>{console.log(new Date(), req.method, req.url); 
    next();
});


server.get('/api/Elisa_music', async (req,res) => {
    try{
        const dbResult = await db.query(`
            select Artist, Title, Year from Elisa_music 
            `);
        res.json(dbResult.rows);

    }catch (err) {
        console.log( 'error fetching data from the database',err);
        res.status(500).send('An error occurred while fetching data.');
    }
})

server.listen(port,()=> {
    console.log(`Server is running on http://localhost:${port}`)
})
};

startServer();