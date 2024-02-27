import {Pool} from "pg";

export const poolConfig = {
    user: "postgres",
    host: "localhost",
    database: "bookdb",
    password: "123456",
    port: 5432
}

export const client = new Pool(poolConfig);