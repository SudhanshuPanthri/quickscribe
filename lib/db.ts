'use server'
import { neon } from '@neondatabase/serverless';

export async function getDb(){
    if(!process.env.NEON_DB_URL){
        throw new Error('NEON_DB_URL is not defined');
    }

    const sql=neon(process.env.NEON_DB_URL);
    return sql;
}