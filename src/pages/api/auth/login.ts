import type { APIContext } from "astro";
import { verify } from "@node-rs/argon2";
import { db } from "@/lib/db";
import { lucia } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";
import { jsonResponse, errorResponse } from "@/lib/utils";

export const prerender = false;

export async function POST(context: APIContext): Promise<Response> {
    try {
        const body = await context.request.json();
        const result = loginSchema.safeParse(body);

        if (!result.success) {
            const errors = result.error.flatten().fieldErrors;
            return errorResponse(
                Object.values(errors).flat().join(", "),
                400,
            );
        }

        const { email, password } = result.data;

        // Find user
        const user = await db.user.findUnique({
            where: { email },
        });

        if (!user || !user.hashedPassword) {
            return errorResponse("Email atau password salah", 401);
        }

        // Check if banned
        if (user.banned) {
            return errorResponse(
                `Akun Anda telah diblokir${user.banReason ? `: ${user.banReason}` : ""}`,
                403,
            );
        }

        // Verify password
        const validPassword = await verify(user.hashedPassword, password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1,
        });

        if (!validPassword) {
            return errorResponse("Email atau password salah", 401);
        }

        // Create session
        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

        return jsonResponse({
            success: true,
            message: "Login berhasil",
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                displayName: user.displayName,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        return errorResponse("Terjadi kesalahan server", 500);
    }
}
