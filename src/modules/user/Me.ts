import { User } from "../../entity/User";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class MeResolver{
  @Query(() => User, {nullable:true})
  async me(@Ctx() ctx:any): Promise<User | undefined>{
    if(!ctx.req.session!.userId){
      return undefined;
    }
    return User.findOne(ctx.req.session!.userId)
  }
}