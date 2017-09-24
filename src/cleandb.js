const createConnection = require('./connection');

const clean = (collection, db) => new Promise((resolve, reject) => collection.deleteMany({}, (err, result) => {
	if (err) reject(err);
	resolve(result);
}));

const cleanAll = (collections, db) => Promise.all(collections.map(collection => clean(collection, db)));

createConnection()
	.then(db => {
		const args = [[db.collection('authors'), db.collection('books')], db];

		return cleanAll(...args)
			.then(result => {
				db.close();
				return result;
			});
	})
	.then(console.log)
	.catch(console.error);