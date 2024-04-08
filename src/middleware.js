import { NextResponse, NextRequest } from 'next/server'

export function middleware(request) {
    let isLogin = request.cookies.get("login");
    if (!isLogin) {
        if (request.nextUrl.pathname.startsWith("/home")) {
            return NextResponse.redirect(new URL("/login", request.url));
        } else if (request.nextUrl.pathname.startsWith("/todo-list")) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    } else if (request.nextUrl.pathname.startsWith("/login")){
        return NextResponse.redirect(new URL("/home", request.url));
    }
}

// export const config = {
//     matcher: ['/todo-list', '/login'],
// }