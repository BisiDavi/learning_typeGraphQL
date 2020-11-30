import { Args, Mutation } from "type-graphql";

export class LoginResolver{
  @Mutation(() => User)
  @async login(@Args("email") email:string
  @Args("password") password:string){
    ;
    const user = await User.findOne({ where: {email}})

    if(!user){
      return null;
    }

    return user;
  }
}