const find = require('./find');

const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
	GraphQLList
} = require('graphql');

const BookType = new GraphQLObjectType({
	name: 'Book',
	description: '...',

	fields: () => ({
		title: {
			type: GraphQLString,
			resolve: data => data.name
		},
		year: {
			type: GraphQLInt,
			resolve: data => data.year
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	description: '...',

	fields: () => ({
		name: {
			type: GraphQLString,
			resolve: data => data.name
		},
		books: {
			type: new GraphQLList(BookType),
			resolve: data => find.findBooksById(data.books)
		}
	})
});

module.exports = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'query',

		fields: () => ({
			author: {
				type: AuthorType,
				args: {
					id: {
						type: GraphQLString
					}
				},
				resolve: (root, args) => find.findAuthorById(args.id)
			}
		})
	})
});