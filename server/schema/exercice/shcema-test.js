const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
} = graphql;

var books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "3" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "2" },
];

var authors = [
  { name: "Patrick Rothfuss", age: 44, id: "1" },
  { name: "Brandon Sanderson", age: 42, id: "2" },
  { name: "Terry Pratchett", age: 66, id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    name: { type: GraphQLString },
    id: { type: GraphQLID },
    genre: { type: GraphQLString },
  }),
});

const AuthorType = new GraphQlObjectType({
  name: "Author",
  fields: () => ({
    name: { type: GraphQLString },
    id: { type: GraphQLID },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: () => {
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: () => {
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

const newBookType = new GRaphQLObjectType({
  name: "Books",
  fields: () => ({
    name: { type: GraphQLString },
    id: { type: GraphQLID },
    genre: { type: GraphQLString },
  }),
});

const newAuthorType = new GraphQLObjectType({
  name: "New Authors",
  fields: () => ({
    name: { type: GraphQLString },
    id: { type: GraphQLID },
    age: { type: GraphQLInt },
  }),
});

const newRootQuery = new GraphQLObjectType({
  name: "New Root Query",
  fields: {
    book: {
      type: newBookType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: newAuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return _.find(authors, { id: args.id });
      },
    },
  },
});

const NewSchema = new GraphQLSchema({
  query: newRootQuery,
});

module.exports = NewSchema;
