import { getToken } from './token';

/**
 * Simulated API Client with Authentication Middleware
 * This utility wraps the native fetch API to automatically inject
 * the JWT token into the Authorization headers of outgoing requests.
 */
export const apiClient = async (
  endpoint: string, 
  options: RequestInit = {}
): Promise<Response> => {
  const token = getToken();
  
  const headers = new Headers(options.headers || {});
  
  // Authentication Middleware Logic: Inject Authorization Header
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  // Set default content type
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // Simulate outgoing request interceptor logging (for enterprise audit purposes)
  console.log(`[API Client] Executing request to ${endpoint} with headers:`, Object.fromEntries(headers.entries()));

  try {
    // In a fully mocked app without a backend, you wouldn't actually call fetch unless to an external API.
    // If you do, it executes here.
    const response = await fetch(endpoint, {
      ...options,
      headers
    });
    
    // Simulate incoming response interceptor logic
    if (response.status === 401) {
      console.warn('[API Client] Unauthorized request intercepted.');
      // AuthContext handles the auto-logout via token expiration,
      // but in a real app, a 401 here could also trigger a token refresh or redirect.
    }
    
    return response;
  } catch (error) {
    console.error(`[API Client] Request failed:`, error);
    throw error;
  }
};
