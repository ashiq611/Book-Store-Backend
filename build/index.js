"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postgres_confiq_1 = require("./postgres-confiq");
const uid_1 = require("uid");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield postgres_confiq_1.client.query("SELECT * FROM books");
        res.status(200).json(books.rows);
    }
    catch (e) {
        res.status(500).json({ message: e });
    }
}));
app.post("/book", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, year } = req.body;
        const id = (0, uid_1.uid)();
        const newBook = yield postgres_confiq_1.client.query("INSERT INTO books (id, title, author, year) VALUES ($1, $2, $3, $4) RETURNING *", [id, title, author, year]);
        res.status(200).json({ message: "Book inserted", data: newBook.rows });
    }
    catch (e) {
        res.status(500).json({ message: e });
    }
}));
app.put("/book/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, author, year } = req.body;
        const updateBook = yield postgres_confiq_1.client.query("UPDATE books SET title = $1, author = $2, year = $3 WHERE id = $4", [title, author, year, id]);
        res.status(200).json({ message: "Book updated", data: updateBook.rows });
    }
    catch (e) {
        res.status(500).json({ message: e });
    }
}));
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
