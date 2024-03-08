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

const AssetType = new GraphQLObjectType({
  name: "asset",
  fields: () => ({
    marketCap: { type: GraphQLFloat },
    marketCapDiluted: { type: GraphQLFloat },
    liquidity: { type: GraphQLFloat },
    price: { type: GraphQLFloat },
    offChainVolume: { type: GraphQLFloat },
    volume: { type: GraphQLFloat },
    volumeChange24h: { type: GraphQLFloat },
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
  }),
});

const MarketHistoryPointType = new GraphQLObjectType({
  name: "MarketHistoryPoint",
  fields: () => ({
    timestamp: { type: GraphQLFloat },
    value: { type: GraphQLFloat },
  }),
});

const marketHistoryType = new GraphQLList(
  new GraphQLList(MarketHistoryPointType)
);

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

const ContractsType = new GraphQLObjectType({
  name: "contracts",
  fields: () => ({
    address: { type: GraphQLString },
    blockchain: { type: GraphQLString },
    blockchainId: { type: GraphQLString },
    decimals: { type: GraphQLInt },
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

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // ICI All Pairs est une fusion entre All Pairs & Market Pair
    // Ajout d'address en args, address récup une pair ou un asset ? A voir
    pairs: {
      type: new GraphQLList(PairType),
      args: {
        blockchain: { type: GraphQLString },
        asset: { type: GraphQLString },
        address: { type: GraphQLString },
        offset: { type: GraphQLInt },
        stats: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        if (args.stats) {
          console.log("Stats are showed");
          return;
        }
        console.log("Stats aren't showed");
        return;
      },
    },
    // Assets contient Get Market Data + Get Market Data ( batch )
    // Essayons de fusionner les deux et de gérer le renvoie d'un tableau d'assets ou un asset.
    assets: {
      type: new GraphQLList(AssetType),
      args: {
        blockchains: { type: new GraphQLList(GraphQLString) },
        assets: { type: new GraphQLList(GraphQLString) },
        symbols: { type: new GraphQLList(GraphQLString) },
      },
      resolve(parent, args) {
        if (args.assets?.length > 1) {
          console.log("Many assets query");
          return [
            {
              marketCap: 0,
              marketCapDiluted: 0,
              liquidity: 0,
              price: 0,
              offChainVolume: 0,
              volume: 0,
              volumeChange24h: 0,
            },
          ];
        }
        console.log("args: Only one asset called", args, "parent:", parent);
        return args.address;
      },
    },
    // A test d'ajouter pairTrades dans allPairs => Une variable trades a ajouté dans all Pairs ?
    // Ca permettrais d'avoir un objet contenant trades, stats suivant un params
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
    pairHistory: {
      type: new GraphQLList(pairHistoryType),
      args: {
        address: { type: GraphQLString },
        blockchain: { type: GraphQLString },
        asset: { type: GraphQLString },
        from: { type: GraphQLInt },
        to: { type: GraphQLInt },
        usd: { type: GraphQLBoolean },
        period: { type: GraphQLString },
        amount: { type: GraphQLInt },
      },
      resolve(parent, args) {
        console.log("args:", args, "parent:", parent);
        return args.address;
      },
    },
    marketHistory: {
      type: priceHistoryType,
      args: {
        asset: { type: GraphQLString },
        blockchain: { type: GraphQLString },
        from: { type: GraphQLInt },
        to: { type: GraphQLInt },
      },
      resolve(parent, args) {
        console.log("args:", args, "parent:", parent);
        return args.address;
      },
    },
    marketAssetQuery: {
      type: new GraphQLList(marketAssetQueryType),
      args: {
        filters: { type: GraphQLString },
        sortBy: { type: GraphQLString },
        sortOrder: { type: GraphQLString },
      },
      resolve(parent, args) {
        return [
          {
            id: null,
            name: null,
            symbol: null,
            liquidity: null,
            market_cap: null,
            volume: null,
            price: null,
            price_change_1h: null,
            price_change_24h: null,
            price_change_7d: null,
            logo: null,
            contracts: null,
          },
        ];
      },
    },
    marketTokenQuery: {
      type: new GraphQLList(marketTokenQueryType),
      args: {
        filters: { type: GraphQLString },
        sortBy: { type: GraphQLString },
        sortOrder: { type: GraphQLString },
      },
      resolve(parent, args) {
        console.log("args:", args, "parent:", parent);
        return args.address;
      },
    },
    swapQuote: {
      type: swapQuoteType,
      args: {
        chain: { type: GraphQLString },
        receiver: { type: GraphQLString },
        fromToken: { type: GraphQLString },
        toToken: { type: GraphQLString },
        fromAddress: { type: GraphQLString },
        amount: { type: GraphQLFloat },
        slippage: { type: GraphQLFloat },
        type: { type: GraphQLString }, // A vérifier voir comment on fais ( should be enum )
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
