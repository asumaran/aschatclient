// Utility function to create API URLs
export function apiUrl(endpoint: string): string {
  const baseUrl = 'http://localhost:4000';
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${baseUrl}/${cleanEndpoint}`;
}
