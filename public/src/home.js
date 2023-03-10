function getTotalBooksCount(books = []) {
  return books.length;
}

//------------------------------------------------------------------------------------------------------------------

function getTotalAccountsCount(accounts = []) {
  return accounts.length;
}

//------------------------------------------------------------------------------------------------------------------

function getBooksBorrowedCount(books) {
  let borrowedBooksCount = 0;
  for (let book of books) {
    const [firstTransaction] = book.borrows;
    if (!firstTransaction.returned) {
      borrowedBooksCount++;
    }
  }  
  return borrowedBooksCount;
}

//------------------------------------------------------------------------------------------------------------------

function getMostCommonGenres(books) {
  const genreCounts = books.reduce((acc, { genre }) => {
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(genreCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

//------------------------------------------------------------------------------------------------------------------

function getMostPopularBooks(books) {
  // Create an array of objects that represent the popularity of each book
  const bookPopularity = books.map((book) => ({
    name: book.title,
    count: book.borrows.length,
  }));
// Sort the array of book popularity objects in descending order of count
  bookPopularity.sort((a, b) => b.count - a.count);
// Return the first five objects in the sorted array
  return bookPopularity.slice(0, 5);
}


//------------------------------------------------------------------------------------------------------------------


function getMostPopularAuthors(books, authors) {
// Helper function to calculate the popularity of an author's books
  function getAuthorBookPopularity(authorId) {
    const authorBooks = books.filter((book) => book.authorId === authorId);
    return getMostPopularBooks(authorBooks).reduce(
      (acc, book) => acc + book.count,
      0
    );
  }
// Create an array of author popularity objects
  const authorPopularity = authors.map((author) => ({
    name: `${author.name.first} ${author.name.last}`,
    count: getAuthorBookPopularity(author.id),
  }));
// Sort the array of author popularity objects in descending order of count
  authorPopularity.sort((a, b) => b.count - a.count);
// Return the first five objects in the sorted array
  return authorPopularity.slice(0, 5);
}



module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
