const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLInt,
  GraphQLFloat,
} = graphql;

var assets = [
  {
    name: "Wormhole",
    symbol: "W",
    id: "1",
    blockchain: ["Ethereum", "Avalanche", "Cardano", "Solana"],
    price: 1,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    id: "2",
    blockchain: ["Ethereum"],
    price: 2800,
  },
  {
    name: "The Graph",
    symbol: "GRT",
    id: "3",
    blockchain: ["Ethereum"],
    price: 0.24,
  },
  {
    name: "Chainlink",
    symbol: "LINK",
    id: "4",
    blockchain: ["Ethereum", "Solana"],
    price: 18,
  },
  {
    name: "Avalanche",
    symbol: "AVAX",
    id: "5",
    blockchain: ["Avalanche", "Cardano", "Ethereum"],
    price: 45,
  },
  {
    name: "Cardano",
    symbol: "ADA",
    id: "6",
    blockchain: ["Cardano"],
    price: 0.6,
  },
];

var blockchains = [
  { name: "Ethereum", id: "1" },
  { name: "Avalanche", id: "2" },
  { name: "Cardano", id: "3" },
  { name: "Solana", id: "4" },
];

const BlockchainType = new GraphQLObjectType({
  name: "blockchain",
  fields: () => ({
    name: { type: GraphQLString },
    id: { type: GraphQLID },
    assets: {
      type: GraphQLList(AssetsType),
      resolve(parent, args) {},
    },
  }),
});

const AssetsType = new GraphQLObjectType({
  name: "Asset",
  fields: () => ({
    name: { type: GraphQLString },
    id: { type: GraphQLID },
    symbol: { type: GraphQLString },
    blockchain: { type: GraphQLList(GraphQLString) },
    price: { type: GraphQLFloat },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    blockchain: {
      type: BlockchainType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {},
    },
    asset: {
      type: AssetsType,
      args: { name: { type: GraphQLString } },
      resolve(args) {},
    },
    allAssets: {
      type: new GraphQLList(AssetsType),
      resolve() {
        return assets;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
