// queries.js - MongoDB queries for PLP Bookstore assignment

require('dotenv').config();
const { MongoClient } = require('mongodb');

// Use environment variable for connection string
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'plp_bookstore';
const collectionName = 'books';

async function runQueries() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB server\n');
    
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // ===== TASK 2: Basic CRUD Operations =====
    console.log('=== TASK 2: Basic CRUD Operations ===\n');

    // 1. Find all books in a specific genre
    console.log('1. All Fiction books:');
    const fictionBooks = await collection.find({ genre: 'Fiction' }).toArray();
    fictionBooks.forEach(book => {
      console.log(`   - "${book.title}" by ${book.author}`);
    });

    // 2. Find books published after a certain year
    console.log('\n2. Books published after 1950:');
    const booksAfter1950 = await collection.find({ published_year: { $gt: 1950 } }).toArray();
    booksAfter1950.forEach(book => {
      console.log(`   - "${book.title}" (${book.published_year})`);
    });

    // 3. Find books by a specific author
    console.log('\n3. Books by George Orwell:');
    const orwellBooks = await collection.find({ author: 'George Orwell' }).toArray();
    orwellBooks.forEach(book => {
      console.log(`   - "${book.title}" (${book.published_year})`);
    });

    // 4. Update the price of a specific book
    console.log('\n4. Updating price of "The Great Gatsby"...');
    const updateResult = await collection.updateOne(
      { title: 'The Great Gatsby' },
      { $set: { price: 11.99 } }
    );
    console.log(`   Modified ${updateResult.modifiedCount} document(s)`);

    // Verify the update
    const updatedBook = await collection.findOne({ title: 'The Great Gatsby' });
    console.log(`   New price: $${updatedBook.price}`);

    // 5. Delete a book by its title
    console.log('\n5. Deleting "Animal Farm"...');
    const deleteResult = await collection.deleteOne({ title: 'Animal Farm' });
    console.log(`   Deleted ${deleteResult.deletedCount} document(s)`);

    // ===== TASK 3: Advanced Queries =====
    console.log('\n\n=== TASK 3: Advanced Queries ===\n');

    // 1. Find books that are both in stock and published after 2010
    console.log('1. Books in stock and published after 2010:');
    const inStockRecentBooks = await collection.find({
      in_stock: true,
      published_year: { $gt: 2010 }
    }).toArray();
    inStockRecentBooks.forEach(book => {
      console.log(`   - "${book.title}" by ${book.author} (${book.published_year}) - $${book.price}`);
    });

    // 2. Use projection to return only title, author, and price
    console.log('\n2. Books with projection (title, author, price only):');
    const projectedBooks = await collection.find(
      { genre: 'Fantasy' },
      { projection: { title: 1, author: 1, price: 1, _id: 0 } }
    ).toArray();
    console.log(projectedBooks);

    // 3. Implement sorting by price (ascending and descending)
    console.log('\n3. Books sorted by price (ascending):');
    const booksAscending = await collection.find({})
      .sort({ price: 1 })
      .project({ title: 1, price: 1, _id: 0 })
      .toArray();
    console.log(booksAscending);

    console.log('\n4. Books sorted by price (descending):');
    const booksDescending = await collection.find({})
      .sort({ price: -1 })
      .project({ title: 1, price: 1, _id: 0 })
      .toArray();
    console.log(booksDescending);

    // 4. Implement pagination (5 books per page)
    console.log('\n5. Pagination - Page 1 (5 books):');
    const page1 = await collection.find({})
      .sort({ title: 1 })
      .limit(5)
      .project({ title: 1, author: 1, _id: 0 })
      .toArray();
    console.log(page1);

    console.log('\n6. Pagination - Page 2 (5 books):');
    const page2 = await collection.find({})
      .sort({ title: 1 })
      .skip(5)
      .limit(5)
      .project({ title: 1, author: 1, _id: 0 })
      .toArray();
    console.log(page2);

    // ===== TASK 4: Aggregation Pipeline =====
    console.log('\n\n=== TASK 4: Aggregation Pipeline ===\n');

    // 1. Calculate average price of books by genre
    console.log('1. Average price by genre:');
    const avgPriceByGenre = await collection.aggregate([
      {
        $group: {
          _id: '$genre',
          averagePrice: { $avg: '$price' },
          bookCount: { $sum: 1 }
        }
      },
      {
        $sort: { averagePrice: -1 }
      }
    ]).toArray();
    console.log(avgPriceByGenre);

    // 2. Find author with the most books
    console.log('\n2. Author with most books:');
    const authorMostBooks = await collection.aggregate([
      {
        $group: {
          _id: '$author',
          bookCount: { $sum: 1 }
        }
      },
      {
        $sort: { bookCount: -1 }
      },
      {
        $limit: 3
      }
    ]).toArray();
    console.log(authorMostBooks);

    // 3. Group books by publication decade and count them
    console.log('\n3. Books grouped by publication decade:');
    const booksByDecade = await collection.aggregate([
      {
        $project: {
          title: 1,
          published_year: 1,
          decade: {
            $subtract: [
              '$published_year',
              { $mod: ['$published_year', 10] }
            ]
          }
        }
      },
      {
        $group: {
          _id: '$decade',
          bookCount: { $sum: 1 },
          books: { $push: '$title' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]).toArray();
    console.log(booksByDecade);

    // ===== TASK 5: Indexing =====
    console.log('\n\n=== TASK 5: Indexing ===\n');

    // 1. Create index on title field
    console.log('1. Creating index on title field...');
    await collection.createIndex({ title: 1 });
    console.log('   Index created on title field');

    // 2. Create compound index on author and published_year
    console.log('2. Creating compound index on author and published_year...');
    await collection.createIndex({ author: 1, published_year: 1 });
    console.log('   Compound index created on author and published_year');

    // 3. Use explain() to demonstrate performance improvement
    console.log('3. Performance analysis with explain():');
    
    // With index
    console.log('   Query with index:');
    const withIndex = await collection.find({ title: 'The Hobbit' })
      .explain('executionStats');
    console.log(`   Documents examined: ${withIndex.executionStats.totalDocsExamined}`);
    console.log(`   Execution time: ${withIndex.executionStats.executionTimeMillis}ms`);

    // Compound index example
    console.log('\n4. Compound index performance:');
    const compoundIndexQuery = await collection.find({
      author: 'J.R.R. Tolkien',
      published_year: { $gte: 1950 }
    })
    .explain('executionStats');
    
    console.log(`   Documents examined: ${compoundIndexQuery.executionStats.totalDocsExamined}`);
    console.log(`   Execution time: ${compoundIndexQuery.executionStats.executionTimeMillis}ms`);

  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    await client.close();
    console.log('\nConnection closed');
  }
}

// Run all queries
runQueries().catch(console.error);