const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
  GraphQLID,
} = require("graphql");
const { PairType } = require("./octopus");

const HistoryPointType = new GraphQLObjectType({
  name: "MarketHistoryPoint",
  fields: () => ({
    timestamp: { type: GraphQLFloat },
    value: { type: GraphQLFloat },
  }),
});

const ContractsType = new GraphQLObjectType({
  name: "contracts",
  fields: () => ({
    address: { type: GraphQLString },
    blockchain: { type: GraphQLString },
    blockchainId: { type: GraphQLString },
    decimals: { type: GraphQLInt },
  }),
});

const PlateFormType = new GraphQLObjectType({
  name: "platform",
  fields: () => ({
    name: { type: GraphQLString },
    rank: { type: GraphQLInt },
    weight: { type: GraphQLInt },
  }),
});

const AssetType = new GraphQLObjectType({
  name: "asset",
  fields: () => ({
    marketCap: { type: GraphQLFloat },
    marketCapDiluted: { type: GraphQLFloat },
    liquidity: { type: GraphQLFloat },
    price: { type: GraphQLFloat },
    offChainVolume: { type: GraphQLFloat },
    volume: { type: GraphQLFloat },
    volume24h: { type: GraphQLFloat },
    volumeChange7d: { type: GraphQLFloat },
    isListed: { type: GraphQLBoolean },
    priceChange24h: { type: GraphQLFloat },
    priceChange1h: { type: GraphQLFloat },
    priceChange7d: { type: GraphQLFloat },
    priceChange1m: { type: GraphQLFloat },
    priceChange1y: { type: GraphQLFloat },
    ath: { type: GraphQLFloat },
    atl: { type: GraphQLFloat },
    rank: { type: GraphQLInt },
    logo: { type: GraphQLString },
    name: { type: GraphQLString },
    symbol: { type: GraphQLString },
    contracts: { type: new GraphQLList(ContractsType) },
    decimals: { type: new GraphQLList(GraphQLInt) },
    type: { type: GraphQLString },
    website: { type: GraphQLString },
    pairs: { type: new GraphQLList(PairType) },
    trendingScore: { type: GraphQLInt },
    platforms: { type: new GraphQLList(PlateFormType) },
    trending: { type: GraphQLBoolean },
    // Under Get Crypto Holdings ( Wallet Explorer API )
    // Could be great to have a params who handle what we return
    audit: { type: GraphQLString },
    blockchains: { type: new GraphQLList(GraphQLString) },
    chat: { type: GraphQLString },
    circulatingSupply: { type: GraphQLFloat },
    description: { type: GraphQLString },
    discord: { type: GraphQLString },
    circulatingSupplyAddresses: { type: new GraphQLList(GraphQLString) },
    kyc: { type: GraphQLString },
    maxSupply: { type: GraphQLFloat },
    id: { type: GraphQLID },
    totalSupply: { type: GraphQLFloat },
    totalSupplyAddresses: { type: new GraphQLList(GraphQLString) },
    twitter: { type: GraphQLString },
    history: { type: new GraphQLList(HistoryPointType) },
  }),
});

module.exports = { AssetType, HistoryPointType, ContractsType };
