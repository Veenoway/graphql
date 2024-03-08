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

const PortfolioAssetType = new GraphQLObjectType({
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

const PortfolioType = new GraphQLObjectType({
  name: "portfolio",
  fields: () => ({
    assets: { type: new GraphQLList(PortfolioAssetType) }, // Change wallet to wallets
    totalWalletBalance: { type: GraphQLFloat },
    wallet: { type: GraphQLString },
    totalRealizedPNL: { type: GraphQLFloat },
    totalUnrealizedPNL: { type: GraphQLFloat },
  }),
});

module.exports = { NFTType, HistoricalNetWorthType, PortfolioType };
