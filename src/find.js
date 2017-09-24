const createConnection = require('./connection');
const ObjectID = require('mongodb').ObjectID;

const find = (params, collection, db) => new Promise((resolve, reject) => {
	collection.find(params).toArray((err, result) => {
		if (err) reject(err);
		console.log(result);
		resolve(result);
	})
});

const findBooksById = (ids) => {
	const objIds = ids.map(id => new ObjectID(id));

	return createConnection()
		.then(db => [db.collection('books'), db])
		.then(args => find({"_id": { $in: objIds }}, ...args));
};

const findAuthorById = (id) => {
	return createConnection()
		.then(db => [db.collection('authors'), db])
		.then(args => find({"_id": new ObjectID(id)}, ...args))
		.then(result => result[0])
};

module.exports = {
	findAuthorById,
	findBooksById
};