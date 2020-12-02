import { Ctx, Mutation, Resolver } from "type-graphql";

@Resolver()
export class LogoutResolver{
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx:any):Promise<Boolean>{
    return new Promise((res, rej) =>{
      ctx.req.session!.destroy((err: any) => {
        if(err){
          console.log(err)
          rej(false);
          ctx.res.clearCookie("cookie")
          res(true)
        }
      })
    }) 
  }
}