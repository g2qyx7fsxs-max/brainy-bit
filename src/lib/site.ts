export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function getArticleUrl(slug: string): string {
  return `${SITE_URL}/articles/${slug}`;
}
