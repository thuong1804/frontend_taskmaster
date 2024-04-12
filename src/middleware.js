import { NextResponse, NextRequest } from 'next/server'

export function middleware(request) {
    let isLogin = request.cookies.get("login");
    if (!isLogin) {
        if (request.nextUrl.pathname.startsWith("/home")) {
            return NextResponse.redirect(new URL("/login", request.url));
        } else if (request.nextUrl.pathname.startsWith("/task")) {
            return NextResponse.redirect(new URL("/login", request.url));
        } else if (request.nextUrl.pathname.startsWith("/manager-user")) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

    } else if (request.nextUrl.pathname.startsWith("/login")){
        return NextResponse.redirect(new URL("/home", request.url));
    } else if (request.nextUrl.pathname.startsWith("/register")) {
        return NextResponse.redirect(new URL("/home", request.url));
    }
}

// export const config = {
//     matcher: ['/todo-list', '/login'],
// }