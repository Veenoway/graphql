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
const { PairType } = require("./octopus");
const { TransactionType, NFTType, WalletType } = require("./wallet-explorer");

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
        pairAmount: { type: GraphQLInt },
        from: { type: GraphQLInt },
        to: { type: GraphQLInt },
        usd: { type: GraphQLBoolean },
        period: { type: GraphQLString },
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
    // Ne pas mettre d'args === allAssets
    assets: {
      type: new GraphQLList(AssetType),
      args: {
        blockchains: { type: new GraphQLList(GraphQLString) },
        asset: { type: GraphQLString },
        assets: { type: new GraphQLList(GraphQLString) },
        symbols: { type: new GraphQLList(GraphQLString) },
        filters: { type: GraphQLString },
        sortBy: { type: GraphQLString },
        sortOrder: { type: GraphQLString },
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
    trades: {
      type: new GraphQLList(PairTradeType),
      args: {
        address: { type: GraphQLString },
        amount: { type: GraphQLInt },
        asset: { type: GraphQLString },
        blockchain: { type: GraphQLString },
      },
      resolve(parent, args) {
        return;
      },
    },
    transactions: {
      type: new GraphQLList(TransactionType),
      args: {
        wallet: { type: GraphQLString },
        blockchains: { type: new GraphQLList(GraphQLString) },
        wallets: { type: new GraphQLList(GraphQLString) },
        from: { type: GraphQLInt },
        to: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        order: { type: GraphQLBoolean },
        asset: { type: GraphQLString },
      },
      resolve(parent, args) {
        return;
      },
    },
    search: {
      type: new GraphQLList(AssetType),
      args: {
        query: { type: GraphQLString },
      },
      resolve(parent, args) {
        return;
      },
    },
    wallet: {
      type: WalletType,
      args: {
        wallet: { type: GraphQLString },
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
