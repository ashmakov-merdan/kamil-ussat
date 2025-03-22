import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: number
  role: string
  exp: number
  iat: number
}

// Routes that don't require authentication
const publicRoutes = ["/login", "/register", "/forgot-password"];
const homeRoute = "/";
const adminRoutes = ["/admin", "/admin/:path*"];

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  
  // Home route is always accessible regardless of auth state
  if (path === homeRoute) {
    return NextResponse.next();
  }
  
  // Handle auth pages (login, register, etc.)
  if (publicRoutes.includes(path)) {
    // If user has a valid token, redirect them away from login/register pages to home
    if (accessToken) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(accessToken);
        const currentTime = Math.floor(Date.now() / 1000);
        
        if (decodedToken.exp && decodedToken.exp > currentTime) {
          // Valid token - redirect to home
          return NextResponse.redirect(new URL(homeRoute, request.url));
        }
      } catch (error) {
        // Invalid token - allow access to login/register
      }
    }
    
    // No valid token, allow access to public routes
    return NextResponse.next();
  }
  
  // Check if route is an admin route
  const isAdminRoute = path.startsWith('/admin');
  
  // For protected routes, check for valid tokens
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  const currentTime = Math.floor(Date.now() / 1000);
  let isAccessTokenValid = false;
  let isRefreshTokenValid = false;
  let decodedAccessToken: DecodedToken | null = null;
  
  // Verify access token
  if (accessToken) {
    try {
      decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      isAccessTokenValid = decodedAccessToken.exp > currentTime;
    } catch (error) {
      // Invalid access token
    }
  }
  
  // Verify refresh token
  if (refreshToken) {
    try {
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);
      isRefreshTokenValid = decodedRefreshToken.exp > currentTime;
    } catch (error) {
      // Invalid refresh token
    }
  }
  
  // Both tokens are expired or invalid, redirect to login
  if (!isAccessTokenValid && !isRefreshTokenValid) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    return response;
  }
  
  // For admin routes, check if user has admin role (using access token data)
  if (isAdminRoute && (!decodedAccessToken || decodedAccessToken.role !== 'admin')) {
    // Not an admin, redirect to home page
    return NextResponse.redirect(new URL(homeRoute, request.url));
  }
  
  // At least one token is valid, allow access to protected route
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};