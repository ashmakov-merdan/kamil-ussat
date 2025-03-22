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

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("access_token")?.value;
  
  // Home route is always accessible regardless of auth state
  if (path === homeRoute) {
    return NextResponse.next();
  }
  
  // Handle auth pages (login, register, etc.)
  if (publicRoutes.includes(path)) {
    // If user has a valid token, redirect them away from login/register pages to home
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
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
  
  // For protected routes, check for a valid token
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      // Token expired
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("access_token");
      return response;
    }
    
    // Valid token, allow access to protected route
    return NextResponse.next();
  } catch (error) {
    // Invalid token
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("access_token");
    return response;
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};