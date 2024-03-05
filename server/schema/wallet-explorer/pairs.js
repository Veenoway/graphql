const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

const TokenType = new GraphQLObjectType({
  name: "token",
  fields: () => ({
    address: { type: GraphQLString },
    decimals: { type: GraphQLInt },
    id: { type: GraphQLID },
    logo: { type: GraphQLString },
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
    priceToken: { type: GraphQLFloat },
    symbol: { type: GraphQLString },
  }),
});

const PairType = new GraphQLObjectType({
  name: "pair",
  fields: () => ({
    address: { type: GraphQLString },
    blockchain: { type: GraphQLString },
    exchange: { type: GraphQLString },
    factory: { type: GraphQLString },
    liquidity: { type: GraphQLFloat },
    volume: { type: GraphQLFloat },
    price: { type: GraphQLFloat },
    protocol: { type: GraphQLString },
    token0: { type: TokenType },
    token1: { type: TokenType },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    allPairs: {
      type: new GraphQLList(PairType),
      resolve() {
        return "ALL PAIRS";
      },
    },

    pair: {
      type: PairType,
      args: {
        address: { type: GraphQLString },
        blockchain: { type: GraphQLString },
        asset: { type: GraphQLString },
        stats: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        console.log("args:", args, "parent:", parent);
        return args.address;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
