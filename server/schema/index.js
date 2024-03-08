const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");
const { AssetType } = require("./commun");
const {
  PairTradeType,
  PairType,
  marketAssetQueryType,
  marketTokenQueryType,
  pairHistoryType,
  priceHistoryType,
  swapQuoteType,
} = require("./octopus");
const {
  HistoricalNetWorthType,
  NFTType,
  PortfolioType,
} = require("./wallet-explorer");

const RootQueryType = new GraphQLObjectType({
  name: "RootQuery",
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
    nfts: {
      type: new GraphQLList(NFTType),
      args: {
        wallet: { type: GraphQLString },
        force: { type: GraphQLBoolean },
        blockchains: { type: GraphQLList(GraphQLString) },
      },
      resolve(parent, args) {
        return _.find(nfts, { tokenId: args.tokenId });
      },
    },
    historicalNetWorthType: {
      type: HistoricalNetWorthType,
      args: {
        // ICI normalement on a wallet, removed and use wallets instead
        wallets: { type: new GraphQLList(GraphQLString) },
        blockchains: { type: new GraphQLList(GraphQLString) },
        from: { type: GraphQLInt },
        to: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return args.wallets[0];
      },
    },
    portfolio: {
      type: PortfolioType,
      args: {
        // Suppression de wallet et ajout de wallets
        wallets: { type: new GraphQLList(GraphQLString) },
        blockchains: { type: new GraphQLList(GraphQLString) },
        cache: { type: GraphQLBoolean },
        stale: { type: GraphQLFloat },
      },
      resolve(parent, args) {
        return args.wallets[0];
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
});
