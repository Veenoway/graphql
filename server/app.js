const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/index");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const mongoURI = process.env.MONGODB_CONNECTOR_URI;

mongoose.connect(mongoURI);
mongoose.connection.once("open", () => {
  console.log("MongoDB connection has been initialised");
  console.log(
    "tolowercase:",
    "0x77A89C51f106D6cD547542a3A83FE73cB4459135".toLowerCase()
  );
});

app.use(
  "/graphql/pairs",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
