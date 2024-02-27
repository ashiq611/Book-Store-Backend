import {Router} from "express";
import { createBook, deleteBook, getBooks, singleBook, updateBook } from "../controller/bookController";

const router = Router();

router.get("/book", getBooks);

router.get("/book/:id", singleBook);

router.post("/book", createBook);

router.put("/book/:id", updateBook);

router.delete("/book/:id", deleteBook);

export default router

