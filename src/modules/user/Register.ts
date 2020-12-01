import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import * as bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { isAuth } from "../middleware/isAuth";
import { logger } from "../middleware/logger";

@Resolver()
export class RegisterResolver {
  @UseMiddleware(isAuth, logger)
  @Query(() => String)
  async hello() {
    return "Hello World";
  }

  @Mutation(() => User)
  async register(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();
    return user;
  }
}
