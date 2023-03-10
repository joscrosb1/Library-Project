function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

//------------------------------------------------------------------------------------------------------------------

function sortAccountsByLastName(accounts) {
  accounts.sort((elementA, elementB) => {
    return elementA.name.last.toLowerCase() < elementB.name.last.toLowerCase()
      ? -1
      : 1;
  });

  return accounts;
}

//------------------------------------------------------------------------------------------------------------------

function getTotalNumberOfBorrows(account, books) {
  // Use reduce to iterate over each book and add up the number of times the account's ID appears in its borrows array
  const totalBorrows = books.reduce((acc, book) => {
    // Use filter to get an array of borrows that match the account's ID
    const accountBorrows = book.borrows.filter(borrow => borrow.id === account.id);
    // Add the length of the array to the accumulator
    return acc + accountBorrows.length;
  }, 0);
  return totalBorrows;
}

//------------------------------------------------------------------------------------------------------------------


function getBooksPossessedByAccount(account, books, authors) {
  //  Get the ID of the account
  let accountId = account.id;
  // Filter the borrows array of each book object to find those checked out by the account
  let checkedOutBooks = books.filter(book => book.borrows.some(borrow => borrow.id === accountId && !borrow.returned));
  // For each checked out book, add its author object to the book object
  let checkedOutBooksWithAuthor = checkedOutBooks.map(book => {
    let author = authors.find(author => author.id === book.authorId);
    return {...book, author};
  });
  // 4. Return the array
  return checkedOutBooksWithAuthor;
}

//------------------------------------------------------------------------------------------------------------------

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
