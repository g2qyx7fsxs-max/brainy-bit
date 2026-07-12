import { Redis } from "@upstash/redis";

const VISITOR_COUNT_KEY = "brainy-bit:visitor-count";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

export async function nextVisitorNumber(): Promise<number> {
  if (!redis) return 0;
  return redis.incr(VISITOR_COUNT_KEY);
}
