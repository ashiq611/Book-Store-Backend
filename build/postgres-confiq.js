"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.poolConfig = void 0;
const pg_1 = require("pg");
exports.poolConfig = {
    user: "postgres",
    host: "localhost",
    database: "bookdb",
    password: "123456",
    port: 5432
};
exports.client = new pg_1.Pool(exports.poolConfig);
