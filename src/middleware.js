import { NextResponse, NextRequest } from 'next/server'
import urlPath from './constant/path';

export function middleware(request) {
    let isLogin = request.cookies.get("login");
    const paths = Object.values(urlPath).filter(item => (item !== urlPath.login && item !== urlPath.register && item !== urlPath.main))
    const requestPath = paths.some(path => request.nextUrl.pathname.startsWith(path))

    if (!isLogin) {
        if (requestPath) {
            return NextResponse.redirect(new URL("auth/login", request.url));
        }

    } else if (request.nextUrl.pathname.startsWith("auth/login")){
        return NextResponse.redirect(new URL("/home", request.url));
    } else if (request.nextUrl.pathname.startsWith("/register")) {
        return NextResponse.redirect(new URL("/home", request.url));
    }
}

// export const config = {
//     matcher: ['/todo-list', '/login'],
// }