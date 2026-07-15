import { Redis } from "@upstash/redis";

const VISITOR_COUNT_KEY = "brainy-bit:visitor-count";
// Maps each anonymous per-device client ID to the number it was already
// assigned, so a retried or duplicate request never hands out a second
// number for the same device.
const VISITOR_NUMBERS_KEY = "brainy-bit:visitor-numbers";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

/**
 * Assigns a stable, sequential visitor number to a device, identified by an
 * anonymous client ID. Idempotent: calling this again with the same
 * clientId always returns the same number instead of incrementing again,
 * so the count reflects unique devices, not requests.
 */
export async function nextVisitorNumber(clientId: string): Promise<number> {
  if (!redis) return 0;

  const existing = await redis.hget<number>(VISITOR_NUMBERS_KEY, clientId);
  if (existing) return existing;

  const number = await redis.incr(VISITOR_COUNT_KEY);
  const wasAssigned = await redis.hsetnx(VISITOR_NUMBERS_KEY, clientId, number);
  if (wasAssigned) return number;

  // Lost a race with a concurrent request for the same clientId — use
  // whichever number that request assigned instead of this wasted one.
  const winner = await redis.hget<number>(VISITOR_NUMBERS_KEY, clientId);
  return winner ?? number;
}
