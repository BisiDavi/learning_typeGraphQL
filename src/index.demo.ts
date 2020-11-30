import { ApolloServer } from "apollo-server-express";
import { Query, Resolver, buildSchema } from "type-graphql";
import * as Express from "express";

@Resolver()
class HelloResolver {
  @Query(() => String)
  async Hello() {
    return "Hello World";
  }
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver]
  });
  const apolloServer = new ApolloServer({ schema });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log(`Server is running on port http://localhost:4000`)
  );
};

main();
