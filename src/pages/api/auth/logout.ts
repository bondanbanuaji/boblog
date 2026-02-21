import type { APIContext } from "astro";
import { lucia } from "@/lib/auth";

export const prerender = false;

export async function POST(context: APIContext): Promise<Response> {
    if (!context.locals.session) {
        return new Response(null, { status: 302, headers: { Location: "/" } });
    }

    await lucia.invalidateSession(context.locals.session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return new Response(null, {
        status: 302,
        headers: { Location: "/" },
    });
}
