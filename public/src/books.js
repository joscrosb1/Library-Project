function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

//------------------------------------------------------------------------------------------------------------------


function findBookById(books, id) {
  return books.find(book => book.id === id);
}

//------------------------------------------------------------------------------------------------------------------


function partitionBooksByBorrowedStatus(books) {
  const checkedOutBooks = [];
  const returnedBooks = [];
  for (const book of books) {
    book.borrows[0].returned ? returnedBooks.push(book) : checkedOutBooks.push(book);
  }
  return [checkedOutBooks, returnedBooks];
}

//------------------------------------------------------------------------------------------------------------------

function getBorrowersForBook(book, accounts) {
  const borrowers = [];
  for (const transaction of book.borrows) {
    const account = accounts.find(account => account.id === transaction.id);
    borrowers.push({...account, returned: transaction.returned});
    if (borrowers.length === 10) {
      break;
    }
  }
  return borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
