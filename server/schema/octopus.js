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
    address: { type: GraphQLString },
    decimals: { type: GraphQLInt },
    id: { type: GraphQLID },
    logo: { type: GraphQLString },
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
    priceToken: { type: GraphQLFloat },
    symbol: { type: GraphQLString },
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
    token0: { type: PairTokenType },
    token1: { type: PairTokenType },
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
    price_change_5min: { type: GraphQLFloat },
    price_change_1h: { type: GraphQLFloat },
    price_change_4h: { type: GraphQLFloat },
    price_change_12h: { type: GraphQLFloat },
    price_change_24h: { type: GraphQLFloat },
    trades_5min: { type: GraphQLFloat },
    buys_5min: { type: GraphQLFloat },
    sells_5min: { type: GraphQLFloat },
    volume_5min: { type: GraphQLFloat },
    buy_volume_5min: { type: GraphQLFloat },
    sell_volume_5min: { type: GraphQLFloat },
    trades_1h: { type: GraphQLFloat },
    buys_1h: { type: GraphQLFloat },
    sells_1h: { type: GraphQLFloat },
    volume_1h: { type: GraphQLFloat },
    buy_volume_1h: { type: GraphQLFloat },
    sell_volume_1h: { type: GraphQLFloat },
    trades_4h: { type: GraphQLFloat },
    buys_4h: { type: GraphQLFloat },
    sells_4h: { type: GraphQLFloat },
    volume_4h: { type: GraphQLFloat },
    buy_volume_4h: { type: GraphQLFloat },
    sell_volume_4h: { type: GraphQLFloat },
    trades_12h: { type: GraphQLFloat },
    buys_12h: { type: GraphQLFloat },
    sells_12h: { type: GraphQLFloat },
    volume_12h: { type: GraphQLFloat },
    buy_volume_12h: { type: GraphQLFloat },
    sell_volume_12h: { type: GraphQLFloat },
    trades_24h: { type: GraphQLFloat },
    buys_24h: { type: GraphQLFloat },
    sells_24h: { type: GraphQLFloat },
    volume_24h: { type: GraphQLFloat },
    buy_volume_24h: { type: GraphQLFloat },
    sell_volume_24h: { type: GraphQLFloat },
  }),
});

const PairTradeType = new GraphQLObjectType({
  name: "pairTrades",
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

const marketHistoryType = new GraphQLList(new GraphQLList(HistoryPointType));

const priceHistoryType = new GraphQLObjectType({
  name: "marketHistory",
  fields: () => ({
    price_history: { type: marketHistoryType },
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
    market_cap: { type: GraphQLFloat },
    volume: { type: GraphQLFloat },
    price: { type: GraphQLFloat },
    price_change_1h: { type: GraphQLFloat },
    price_change_24h: { type: GraphQLFloat },
    price_change_7d: { type: GraphQLFloat },
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
    volume_24h: { type: GraphQLFloat },
    listed_at: { type: GraphQLString },
    pairs: { type: new GraphQLList(PairType) },
  }),
});

const txSwapQuoteType = new GraphQLObjectType({
  name: "txSwapQuote",
  fields: () => ({
    data: { type: GraphQLString },
    from: { type: GraphQLString },
    to: { type: GraphQLString },
    value: { type: GraphQLString },
  }),
});

const swapQuoteType = new GraphQLObjectType({
  name: "swapQuote",
  fields: () => ({
    amountOut: { type: GraphQLString },
    error: { type: GraphQLString },
    isAggregator: { type: GraphQLBoolean },
    protocol: { type: GraphQLString },
    tx: { type: txSwapQuoteType },
    willFail: { type: GraphQLBoolean },
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
  swapQuoteType,
};
