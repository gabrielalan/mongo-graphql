const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/mongo-graphql';

module.exports = () => new Promise((resolve, reject) => MongoClient.connect(url, function(err, db) {
	if (err) reject(err);
	console.log("Connected successfully to server");
	resolve(db);
}));