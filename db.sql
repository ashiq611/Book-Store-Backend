CREATE TABlE books (
    id CHAR(11) PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    year INT
)

INSERT INTO books (id, title, author, year) VALUES ("1", "The Great Gatsby", "F. Scott Fitzgerald", 1925)