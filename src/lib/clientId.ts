const CLIENT_ID_KEY = "brainy-bit:client-id";

/**
 * A random, opaque per-device identifier used only to deduplicate analytics
 * counts (e.g. "how many unique visitors from Turkey", not "how many page
 * views"). It's never displayed anywhere and carries no personal info —
 * same anonymity guarantee as the rest of the site's localStorage state.
 */
export function getOrCreateClientId(): string {
  const existing = localStorage.getItem(CLIENT_ID_KEY);
  if (existing) return existing;

  const created = crypto.randomUUID();
  localStorage.setItem(CLIENT_ID_KEY, created);
  return created;
}
