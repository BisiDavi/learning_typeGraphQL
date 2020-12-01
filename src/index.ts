import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import Express from "express";
import connectRedis from "connect-redis";
import session from "express-session";
import { config } from "dotenv";
import cors from "cors";

import { RegisterResolver } from "./modules/user/Register";
import { LoginResolver } from "./modules/user/Login";
import { redis } from "./redis";
import { MeResolver } from "./modules/user/Me";

config();

const main = async () => {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [MeResolver, RegisterResolver, LoginResolver],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    }
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
      secret: "royalty",
      name: "cookie",
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
