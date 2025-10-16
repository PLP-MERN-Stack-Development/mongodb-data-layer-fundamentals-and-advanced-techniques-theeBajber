# MongoDB Data Layer Fundamentals and Advanced Techniques

## Project Overview
This project demonstrates comprehensive MongoDB fundamentals including database setup, CRUD operations, aggregation pipelines, indexing, and performance optimization using a bookstore database. The implementation showcases real-world database management techniques with a complete book inventory system.

## Assignment Completion Status

### All Tasks Successfully Completed

| Task | Status | Details |
|------|---------|----------|
| **Task 1: MongoDB Setup** |  Complete | Database `plp_bookstore` and collection `books` created |
| **Task 2: Basic CRUD Operations** |  Complete | All CRUD operations executed successfully |
| **Task 3: Advanced Queries** |  Complete | Filtering, projection, sorting, and pagination implemented |
| **Task 4: Aggregation Pipeline** |  Complete | Data analysis with grouping and averaging |
| **Task 5: Indexing** |  Complete | Performance optimization with indexes |

## Database Schema

The `books` collection contains documents with the following structure:

```javascript
{
  title: String,
  author: String,
  genre: String,
  published_year: Number,
  price: Number,
  in_stock: Boolean,
  pages: Number,
  publisher: String
}
```

## Implementation Results

### Database Statistics
- **Total Documents:** 14 books  
- **Database:** `plp_bookstore`  
- **Collection:** `books`  
- **Storage Size:** 3MB  
- **Indexes Created:** 2 (title field, author+published_year compound)

### Key Performance Metrics
- **Indexed Query Performance:** 1ms execution time  
- **Documents Examined:** 1 (with proper indexing)  
- **Query Optimization:** Significant improvement demonstrated

## Technical Implementation

### CRUD Operations Executed
1. **Find Operations:** By genre, author, publication year  
2. **Update Operations:** Price modification for specific books  
3. **Delete Operations:** Removal of books by title  
4. **Complex Queries:** Multi-field filtering with projection  

### Advanced Features Implemented
- **Field Projection:** Selective field retrieval  
- **Sorting:** Ascending and descending by price  
- **Pagination:** 5 books per page implementation  
- **Aggregation:** Grouping, averaging, and counting operations  

### Aggregation Pipeline Results
- **Average Price by Genre:** Fantasy highest at $16.99  
- **Author Statistics:** J.R.R. Tolkien with most books (2)  
- **Publication Analysis:** Books grouped by decade (1810s–2000s)

## Project Structure

```
mongodb-data-layer-fundamentals-and-advanced-techniques/
├── insert_books.js          # Database population script
├── queries.js               # All MongoDB queries and operations
├── .env                     # Environment variables (not committed)
├── .gitignore               # Git ignore rules
├── package.json             # Project dependencies
└── README.md                # Project documentation
```

## Setup and Execution

### Prerequisites
- Node.js installed  
- MongoDB Atlas account or local MongoDB instance  
- MongoDB connection string  

### Installation


# Install dependencies
npm install


```

### Execution
```bash
# Populate the database
node insert_books.js

# Execute all queries and operations
node queries.js
```

## Evidence of Implementation

### MongoDB Atlas Database
![MongoDB Atlas Database](Screenshot%20from%202025-10-06%2011-23-05.png)

*Shows the `plp_bookstore` database with `books` collection containing 14 documents.*

### Query Execution Results
![Query Results](Screenshot%20from%202025-10-06%2011-52-55.png)

*Demonstrates successful execution of all CRUD operations and queries.*

## Technical Details

### Indexing Strategy
1. **Single Field Index:** `title` field for fast book lookups  
2. **Compound Index:** `author` and `published_year` for author-time period queries  

### Performance Optimization
- **Query Execution Time:** Reduced to 1ms with proper indexing  
- **Documents Examined:** Minimized from full collection scan to targeted documents  
- **Memory Usage:** Optimized through proper projection and filtering  

### Data Analysis Capabilities
- **Genre-based Analysis:** Price trends across different genres  
- **Temporal Analysis:** Publication patterns by decade  
- **Author Performance:** Book counts and distribution by author  

## Business Insights Generated

### Pricing Analysis
- Highest average price: Fantasy genre ($16.99)  
- Lowest average price: Romance genre ($7.99)  
- Price range: $7.99 - $19.99 across all books  

### Inventory Insights
- Total unique authors: 12  
- Genre distribution: 7 different genres  
- Publication span: 1813–2008 (195 years)

## Learning Outcomes
This project demonstrates proficiency in:
- MongoDB database design and management  
- Advanced query construction and optimization  
- Aggregation pipeline development  
- Performance tuning with indexing  
- Real-world data analysis techniques  
- Professional documentation practices  

## Security Notes
- Connection strings stored in environment variables  
- Sensitive data excluded from version control  
- Secure database access practices implemented  

## Support
For questions or issues regarding this implementation, please refer to the code comments or MongoDB official documentation.

---

**Project Completed:** All assignment requirements successfully implemented and verified through comprehensive testing and documentation.