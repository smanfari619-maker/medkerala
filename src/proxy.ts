import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import type { NextRequest } from 'next/server';

const handleRequest = createMiddleware(routing);

export function proxy(request: NextRequest) {
  return handleRequest(request);
}

export const config = {
  // Match all pathnames except for:
  // - api (API routes)
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico, sitemap.xml, robots.txt (metadata files)
  // - images (public images assets)
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)']
};

