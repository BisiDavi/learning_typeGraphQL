import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<any> = async ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("not authenticated");
  }

  return next();
};
 