/* Protecting all routes except one or more public paths

By default, clerkMiddleware() treats all pages as public unless explicitly protected. If you prefer for it to operate the other way around (all pages are protected unless explicitly made public), you can reverse the middleware logic in this way:

*/

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/']);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return; // if it's a public route, do nothing

  await auth.protect(); // for any other route, require auth
});


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};