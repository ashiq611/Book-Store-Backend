import { client } from "../postgres-confiq";
import { uid } from "uid";
import { Request, Response } from "express"; // Import the Request and Response types from "express"
const getBooks = async (req: Request, res: Response) => {
    try {
        const books = await client.query("SELECT * FROM books");
        res.status(200).json(books.rows); // Call the json() method with books.rows as an argument
    } catch (e) {
        res.status(500).json({ message: e });
    }
};


const singleBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const book = await client.query("SELECT * FROM books WHERE id = $1", [id]);
        res.status(200).json(book.rows);
        
    }catch(e){
        res.status(500).json({message:e})
    }
}

const createBook = async (req: Request, res: Response) => {
    
    try {
      const { title, author, year } = req.body;
      const id = uid();

      const newBook = await client.query(
        "INSERT INTO books (id, title, author, year) VALUES ($1, $2, $3, $4) RETURNING *",
        [id, title, author, year]
      );

      res.status(200).json({ message: "Book inserted", data: newBook.rows });
    } catch (e) {
      res.status(500).json({ message: e });
    }
}

const updateBook = async (req: Request, res: Response) => {
     try {
       const { id } = req.params;
       const { title, author, year } = req.body;
       const updateBook = await client.query(
         "UPDATE books SET title = $1, author = $2, year = $3 WHERE id = $4 RETURNING *",
         [title, author, year, id]
       );
       res.status(200).json({ message: "Book updated", data: updateBook.rows });
     } catch (e) {
       res.status(500).json({ message: e });
     }
}

const deleteBook = async (req: Request, res: Response) => {
     try {
       const { id } = req.params;
       const deleteBook = await client.query(
         "DELETE FROM books WHERE id = $1 RETURNING *",
         [id]
       );

       res.status(200).json({ message: "Book deleted", data: deleteBook.rows });
     } catch (e) {
       res.status(500).json({ message: e });
     }
}


export { getBooks, singleBook, createBook , updateBook, deleteBook} 