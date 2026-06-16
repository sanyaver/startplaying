// Next.js 16 renamed the `middleware` convention to `proxy`.
// Clerk's clerkMiddleware works here and gates protected routes.
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Booking requires authentication; everything else stays public.
const isProtectedRoute = createRouteMatcher(["/book(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next internals and static files, run on everything else
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
