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

const MarketPairType = new GraphQLObjectType({
  name: "market-pair",
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

const PairTradeType = new GraphQLObjectType({
  name: "pair-trades",
  fields: () => ({
    blockchain: { type: GraphQLString },
    date: { type: GraphQLInt },
    hash: { type: GraphQLString },
    token_amount: { type: GraphQLFloat },
    token_amount_usd: { type: GraphQLFloat },
    token_price: { type: GraphQLFloat },
    token_price_vs: { type: GraphQLFloat },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    allPairs: {
      type: new GraphQLList(MarketPairType),
      resolve() {
        return "ALL PAIRS";
      },
    },
    pairMarket: {
      type: MarketPairType,
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
    pairTrades: {
      type: new GraphQLList(PairTradeType),
      args: {
        address: { type: GraphQLString },
        blockchain: { type: GraphQLString },
        asset: { type: GraphQLString },
        amount: { type: GraphQLInt },
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
