export function getBaseUrl(): string {
  const baseUrl = process.env.BASE_URL || '';
  return baseUrl;
}
