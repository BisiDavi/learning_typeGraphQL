import { redis } from "../../redis";
import { v4 } from "uuid";
import { confirmationPrefix } from "../constants/redisPrefixes";

export const createConfirmationUrl = async (userId: number) => {
  const tokenid = v4();
  await redis.set(confirmationPrefix + tokenid, userId, "ex", 60 * 60 * 24); // 1 day expiration

  return `http://localhost:3000/user/confirm/${tokenid}`;
};
