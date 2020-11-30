import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { RegisterResolver } from "./modules/user/Register";
import Express from "express";
import session = require("express-session");
import connectRedis from "connect-redis";
import { config } from "dotenv";
import cors from "cors";
import { redis } from "./redis";

config(); 

const main = async () => {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [RegisterResolver]
  });
  const apolloServer = new ApolloServer({
    schema,
    playground: true,
    context: ({ req }: any) => ({ req })
  });

  const app = Express();
  const RedisStore = connectRedis(session);
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000"
    })
  );
  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: "cookie",
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 1 * 365
      }
    } as any)
  );

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(`Server is running on port 4000`);
  });
};

main();
