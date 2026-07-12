import { Redis } from "@upstash/redis";

const NEWSLETTER_KEY = "brainy-bit:newsletter-signups";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

export interface NewsletterSignup {
  firstName: string;
  surname: string;
  email: string;
  signedUpAt: string;
}

export async function addNewsletterSignup(data: {
  firstName: string;
  surname: string;
  email: string;
}): Promise<boolean> {
  if (!redis) return false;

  const signup: NewsletterSignup = { ...data, signedUpAt: new Date().toISOString() };
  await redis.hset(NEWSLETTER_KEY, { [data.email.toLowerCase()]: JSON.stringify(signup) });
  return true;
}
