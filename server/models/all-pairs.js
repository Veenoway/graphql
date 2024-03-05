type Token {
    address: String!
    decimals: Int!
    id: ID!
    logo: String
    name: String!
    price: Float!
    priceToken: Float!
    symbol: String!
  }
  
  type Pair {
    address: String!
    blockchain: String!
    exchange: String!
    factory: String!
    liquidity: Float!
    price: Float!
    protocol: String!
    token0: Token!
    token1: Token!
    volume: Float!
  }
  
  type Query {
    pairs: [Pair!]!
  }