const authors = require('./data/authors');
const books = require('./data/books');
const createConnection = require('./connection');

const insert = (data, collection, db) => new Promise((resolve, reject) => collection.insertMany(data, (err, result) => {
	if (err) reject(err);
	resolve([db, result]);
}));

const insertAll = (all) => Promise.all(all.map(args => insert(...args)));

createConnection()
	.then(db => [
		[authors, db.collection('authors'), db],
		[books, db.collection('books'), db]
	])
	.then(insertAll)
	.then(results => {
		const db = results[0][0];
		db.close();
	})
	.catch(console.error);