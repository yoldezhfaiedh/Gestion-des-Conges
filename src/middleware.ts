import { NextResponse, NextRequest } from 'next/server'
import auth from './auth.json'

interface AuthPages {
  [key: string]: { roles: string[] }
}async function fetchUserRole(token: any) {
  try {
    const response = await fetch(`http://localhost:5000/auth/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    return data.Role;
  } catch (error) {
    // Handle any errors here
    console.error('Error fetching user role:', error);
    // Return a response indicating a redirection to the login page
    return '/login';
  }
}

export async function middleware(request: NextRequest) {
  const token: any = request.cookies.get('token')


  if (request.nextUrl.pathname.startsWith('/login') && !token) {
    return
  }

 
  if (!token && request.nextUrl.pathname === '/') {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
}


  const role = await fetchUserRole(token)
console.log(role)
  if (
    auth.public.includes(request.nextUrl.pathname) ||
    (request.nextUrl.pathname.startsWith("/Espace_Admin") && role !== "Admin")
  ) {
    const url = new URL('/401', request.url)

    return NextResponse.redirect(url)
  }

  if (
    auth.public.includes(request.nextUrl.pathname) ||
    (request.nextUrl.pathname.startsWith("/Espace_ResponsableRH") && role !== "Responsable Rh")
  ) {
    const url = new URL('/401', request.url)

    return NextResponse.redirect(url)
  }
  if (
    auth.public.includes(request.nextUrl.pathname) ||
    (request.nextUrl.pathname.startsWith("/Espace_Manager") && role !== "Manager")
  ) {
    const url = new URL('/401', request.url)

    return NextResponse.redirect(url)
  }
  if (
    auth.public.includes(request.nextUrl.pathname) ||
    (request.nextUrl.pathname.startsWith("/Espace_Employe") && role !== "Employe")
  ) {
    const url = new URL('/401', request.url)

    return NextResponse.redirect(url)
  }





  if (request.nextUrl.pathname && role && (auth.pages as unknown as AuthPages)[request.nextUrl.pathname]) {
    if (!(auth.pages as unknown as AuthPages)[request.nextUrl.pathname].roles.includes(role)) {
      const url = new URL('/401', request.url)

      return NextResponse.redirect(url)
    }
  }
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/Espace_Employe/:path*',
    '/Espace_ResponsableRH/:path*',
    '/Espace_Admin/:path*',
    '/Espace_Manager/:path*'
  ]
}