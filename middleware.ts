import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Manually define allowed origins
  const ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'https://theminermag.com',
    process.env.NEXT_PUBLIC_website_url,
    // Add any additional domains or subdomains here
  ]

  // Check origins using multiple methods
  const origin = request.headers.get('origin')
  const referer = request.headers.get('referer')
  const host = request.headers.get('host')

  // Function to check if the source matches any allowed origin
  const isAllowedSource = (source: string | null) => {
    if (!source) return false;
    
    try {
      const sourceUrl = new URL(source);
      
      return ALLOWED_ORIGINS.some(allowedOrigin => {
        const allowedUrl = new URL(allowedOrigin);
        
        return sourceUrl.hostname === allowedUrl.hostname ||
               sourceUrl.hostname.endsWith(`.${allowedUrl.hostname}`);
      });
    } catch {
      return false;
    }
  }

  // Check if the request is targeting an edge function
  const isEdgeFunction = request.nextUrl.pathname.startsWith('/api/')

  // Verbose logging for debugging
  // console.log('Request Details:', {
  //   origin,
  //   referer,
  //   host,
  //   pathname: request.nextUrl.pathname,
  //   allowedOrigins: ALLOWED_ORIGINS
  // });

  // If it's an edge function, perform strict origin checking
  if (isEdgeFunction) {
    const isAllowed = 
      isAllowedSource(origin) || 
      isAllowedSource(referer) ||
      (host && ALLOWED_ORIGINS.some(allowedOrigin => 
        host.includes(new URL(allowedOrigin).hostname)
      ))

    if (!isAllowed) {
      return new NextResponse(
        JSON.stringify({ 
          error: 'Unauthorized access to edge function',
          status: 'error'
        }), 
        { 
          status: 403,
          headers: {
            'Content-Type': 'application/json',
            'X-Blocked-Reason': 'Origin not allowed'
          }
        }
      )
    }
  }

  // If the request is allowed, continue normally
  return NextResponse.next()
}

// Configure which routes this middleware should run on
export const config = {
  matcher: '/api/:path*'
}