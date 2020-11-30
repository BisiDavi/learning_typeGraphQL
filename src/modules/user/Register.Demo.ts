import { UserDemo } from "src/entity/User.demo";
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root
} from "type-graphql";
import * as bcrypt from "bcryptjs";

@Resolver(UserDemo)
export class RegisterDemo {
  @Query(() => String)
  async sayHello() {
    return "Hello User";
  }

  @FieldResolver()
  async name(@Root() parent: UserDemo) {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Mutation(() => UserDemo)
  async registerUser(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<UserDemo> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await UserDemo.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();

    return user;
  }
}
