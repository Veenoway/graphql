const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
} = require("graphql");
const { HistoryPointType, ContractsType } = require("./commun");

const PairTokenType = new GraphQLObjectType({
  name: "pairToken",
  fields: () => ({
    ...AssetType.getFields(),
    address: { type: GraphQLString },
    decimals: { type: GraphQLInt },
    id: { type: GraphQLID },
    priceToken: { type: GraphQLFloat },
    totalSupply: { type: GraphQLFloat },
    circulatingSupply: { type: GraphQLFloat },
    priceTokenString: { type: GraphQLString },
    approximateReserveUSD: { type: GraphQLFloat },
    approximateReserveTokenRaw: { type: GraphQLString },
    approximateReserveToken: { type: GraphQLFloat },
  }),
});

const PairType = new GraphQLObjectType({
  name: "pairMarket",
  fields: () => ({
    token0: { type: AssetType },
    token1: { type: AssetType },
    volume24h: { type: GraphQLFloat },
    liquidity: { type: GraphQLFloat },
    blockchain: { type: GraphQLString },
    address: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    type: { type: GraphQLString },
    baseToken: { type: GraphQLString },
    exchange: { type: GraphQLString },
    factory: { type: GraphQLString },
    quoteToken: { type: GraphQLString },
    priceChange5min: { type: GraphQLFloat },
    priceChange1h: { type: GraphQLFloat },
    priceChange4h: { type: GraphQLFloat },
    priceChange12h: { type: GraphQLFloat },
    priceChange24h: { type: GraphQLFloat },
    trades5min: { type: GraphQLFloat },
    buys5min: { type: GraphQLFloat },
    sells5min: { type: GraphQLFloat },
    volume5min: { type: GraphQLFloat },
    buyVolume5min: { type: GraphQLFloat },
    sellVolume5min: { type: GraphQLFloat },
    trades1h: { type: GraphQLFloat },
    buys1h: { type: GraphQLFloat },
    sells1h: { type: GraphQLFloat },
    volume1h: { type: GraphQLFloat },
    buyVolume1h: { type: GraphQLFloat },
    sellVolume1h: { type: GraphQLFloat },
    trades4h: { type: GraphQLFloat },
    buys4h: { type: GraphQLFloat },
    sells4h: { type: GraphQLFloat },
    volume4h: { type: GraphQLFloat },
    buyVolume4h: { type: GraphQLFloat },
    sellVolume4h: { type: GraphQLFloat },
    trades12h: { type: GraphQLFloat },
    buys12h: { type: GraphQLFloat },
    sells12h: { type: GraphQLFloat },
    volume12h: { type: GraphQLFloat },
    buyVolume12h: { type: GraphQLFloat },
    sellVolume12h: { type: GraphQLFloat },
    trades24h: { type: GraphQLFloat },
    buys24h: { type: GraphQLFloat },
    sells24h: { type: GraphQLFloat },
    volume24h: { type: GraphQLFloat },
    buyVolume24h: { type: GraphQLFloat },
    sellVolume24h: { type: GraphQLFloat },
    trades: { type: new GraphQLList(PairTradeType) },
    history: { type: new GraphQLList(pairHistoryType) },
  }),
});

const PairTradeType = new GraphQLObjectType({
  name: "pairTrades",
  fields: () => ({
    blockchain: { type: GraphQLString },
    date: { type: GraphQLInt },
    hash: { type: GraphQLString },
    tokenAmount: { type: GraphQLFloat },
    tokenAmountUSD: { type: GraphQLFloat },
    tokenPrice: { type: GraphQLFloat },
    tokenPriceVS: { type: GraphQLFloat },
  }),
});

const marketHistoryType = new GraphQLList(new GraphQLList(HistoryPointType));

const priceHistoryType = new GraphQLObjectType({
  name: "marketHistory",
  fields: () => ({
    priceHistory: { type: marketHistoryType },
  }),
});

const pairHistoryType = new GraphQLObjectType({
  name: "pairHistory",
  fields: () => ({
    close: { type: GraphQLFloat },
    high: { type: GraphQLFloat },
    low: { type: GraphQLFloat },
    open: { type: GraphQLFloat },
    time: { type: GraphQLInt },
    volume: { type: GraphQLFloat },
  }),
});

const marketAssetQueryType = new GraphQLObjectType({
  name: "marketAssetQuery",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    symbol: { type: GraphQLString },
    liquidity: { type: GraphQLFloat },
    marketCap: { type: GraphQLFloat },
    volume: { type: GraphQLFloat },
    price: { type: GraphQLFloat },
    priceChange1h: { type: GraphQLFloat },
    priceChange24h: { type: GraphQLFloat },
    priceChange7d: { type: GraphQLFloat },
    logo: { type: GraphQLString },
    contracts: { type: GraphQLList(ContractsType) },
  }),
});

const marketTokenQueryType = new GraphQLObjectType({
  name: "marketTokenQuery",
  fields: () => ({
    name: { type: GraphQLString },
    symbol: { type: GraphQLString },
    address: { type: GraphQLString },
    blockchain: { type: GraphQLString },
    decimals: { type: GraphQLInt },
    volume24h: { type: GraphQLFloat },
    listedAt: { type: GraphQLString },
    pairs: { type: new GraphQLList(PairType) },
  }),
});

module.exports = {
  PairTokenType,
  PairType,
  PairTradeType,
  priceHistoryType,
  pairHistoryType,
  marketAssetQueryType,
  marketTokenQueryType,
};
