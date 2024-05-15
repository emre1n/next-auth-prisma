/**
 * An array of public routes that do not require authentication.
 * These routes will not redirect logged in users to '/settings'.
 * @type {string[]}
 */
export const publicRoutes: string[] = ['/', '/new-verification'];

/**
 * An array of public routes that are used for authentication.
 * These routes will redirect logged in users to '/settings'.
 * @type {string[]}
 */
export const authRoutes: string[] = ['/login', '/register', '/error'];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix will be authenticated.
 * @type {string}
 */
export const apiAuthPrefix: string = '/api/auth';

/**
 * The default redirect path after logging in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = '/settings';
