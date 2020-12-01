import { User } from "src/entity/User";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class MeResolver{
  @Query(() => User, {nullable:true})
  async me(@Ctx() ctx:any){
    if(!ctx.req.session!.userId){
      return null;
    }
    return User.findOne(ctx.req.session!.userId)
  }
}