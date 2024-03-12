const { GraphQLJSONObject } = require("graphql-type-json");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
} = require("graphql");
const { HistoryPointType, AssetType } = require("./commun");

const NFTType = new GraphQLObjectType({
  name: "nfts",
  fields: () => ({
    amount: { type: GraphQLString },
    tokenId: { type: GraphQLString },
    tokenAddress: { type: GraphQLString },
    contractType: { type: GraphQLString },
    metadata: { type: GraphQLString },
    name: { type: GraphQLString },
    symbol: { type: GraphQLString },
    tokenHash: { type: GraphQLString },
    tokenUri: { type: GraphQLString },
    verifiedCollection: { type: GraphQLBoolean },
    collectionLogo: { type: GraphQLString },
    collectionBannerImage: { type: GraphQLString },
    blockchain: { type: GraphQLString },
  }),
});

const HistoricalNetWorthType = new GraphQLObjectType({
  name: "historicalNetWorth",
  fields: () => ({
    wallets: { type: new GraphQLList(GraphQLString) }, // Change wallet to wallets
    balanceUSD: { type: GraphQLFloat },
    balanceHistory: {
      type: new GraphQLList(new GraphQLList(HistoryPointType)),
    },
  }),
});

const CrossChainBalanceType = new GraphQLObjectType({
  name: "CrossChainBalance",
  fields: () => ({
    balance: { type: GraphQLFloat },
    balanceRaw: { type: GraphQLString },
    chainId: { type: GraphQLString },
    address: { type: GraphQLString },
  }),
});

const ContractsBalanceType = new GraphQLObjectType({
  name: "ContractsBalance",
  fields: () => ({
    balance: { type: GraphQLFloat },
    balanceRaw: { type: GraphQLString },
    address: { type: GraphQLString },
    decimals: { type: GraphQLInt },
    chainId: { type: GraphQLString },
  }),
});

const WalletAssetType = new GraphQLObjectType({
  name: "PortfolioAsset",
  fields: () => ({
    asset: { type: AssetType },
    realizedPNL: { type: GraphQLFloat },
    unrealizedPNL: { type: GraphQLFloat },
    allocation: { type: GraphQLFloat },
    price: { type: GraphQLFloat },
    priceBought: { type: GraphQLFloat },
    totalInvested: { type: GraphQLFloat },
    minBuyPrice: { type: GraphQLFloat },
    maxBuyPrice: { type: GraphQLFloat },
    estimatedBalance: { type: GraphQLFloat },
    tokenBalance: { type: GraphQLFloat },
    // A vérifier si on peux pas faire mieux / Ce serais bien de return un arr plutot qu'un objet avec le nom de la chain
    // Polygon: { balance: 0.5, balanceRaw: "500000000000000000" } => => => [{ name: "Polygon", balance: 0.5, balanceRaw: "500000000000000000" }]
    crossChainBalances: { type: GraphQLJSONObject },
    contractsBalances: { type: new GraphQLList(ContractsBalanceType) },
  }),
});

const WalletType = new GraphQLObjectType({
  name: "wallet",
  fields: () => ({
    assets: { type: new GraphQLList(WalletAssetType) }, // Change wallet to wallets
    totalWalletBalance: { type: GraphQLFloat },
    wallet: { type: GraphQLString },
    totalRealizedPNL: { type: GraphQLFloat },
    totalUnrealizedPNL: { type: GraphQLFloat },
    balanceHistory: { type: new GraphQLList(HistoryPointType) },
  }),
});

const TxType = new GraphQLObjectType({
  name: "tx",
  fields: () => ({
    timestamp: { type: GraphQLFloat },
    asset: { type: AssetType },
    type: { type: GraphQLString },
    methodId: { type: GraphQLString },
    hash: { type: GraphQLString },
    blockchain: { type: GraphQLString },
    amount: { type: GraphQLFloat },
    amount_usd: { type: GraphQLFloat },
    to: { type: GraphQLString },
    from: { type: GraphQLString },
  }),
});

const TransactionType = new GraphQLObjectType({
  name: "transactions",
  fields: () => ({
    wallet: { type: GraphQLString },
    limit: { type: GraphQLInt },
    offset: { type: GraphQLInt },
    page: { type: GraphQLInt },
    total: { type: GraphQLInt },
    lastUpdated: { type: GraphQLInt },
    transactions: { type: new GraphQLList(TxType) },
  }),
});

module.exports = {
  NFTType,
  HistoricalNetWorthType,
  WalletType,
  TransactionType,
};
