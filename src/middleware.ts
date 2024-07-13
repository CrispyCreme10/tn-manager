import { auth } from "@/auth";
import { DEFAULT_ROUTE, LOGIN_ROUTE, PUBLIC_ROUTES, ROOT } from "@/lib/routes";

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  console.log("isAuthenticated:", isAuthenticated);
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  // redirect to login if not authenticated
  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL(LOGIN_ROUTE, nextUrl));
  }

  // redirect to default route if authenticated and going to login page
  if (LOGIN_ROUTE.includes(nextUrl.pathname) && isAuthenticated) {
    return Response.redirect(new URL(DEFAULT_ROUTE, nextUrl));
  }

  // redirect to default route if unauthenticated and trying to access non-public route
  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL(DEFAULT_ROUTE, nextUrl), 401)
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
