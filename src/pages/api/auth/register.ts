import type { APIContext } from "astro";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { db } from "@/lib/db";
import { lucia } from "@/lib/auth";
import { registerSchema } from "@/lib/validation";
import { jsonResponse, errorResponse } from "@/lib/utils";

export const prerender = false;

export async function POST(context: APIContext): Promise<Response> {
    try {
        const body = await context.request.json();
        const result = registerSchema.safeParse(body);

        if (!result.success) {
            const errors = result.error.flatten().fieldErrors;
            return errorResponse(
                Object.values(errors).flat().join(", "),
                400,
            );
        }

        const { email, username, displayName, password } = result.data;

        // Check existing user
        const existingUser = await db.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return errorResponse("Email sudah terdaftar", 409);
            }
            return errorResponse("Username sudah digunakan", 409);
        }

        // Hash password
        const hashedPassword = await hash(password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1,
        });

        // Create user
        const userId = generateIdFromEntropySize(10);
        const user = await db.user.create({
            data: {
                id: userId,
                email,
                username,
                displayName,
                hashedPassword,
                role: "READER",
            },
        });

        // Create session
        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

        return jsonResponse(
            {
                success: true,
                message: "Pendaftaran berhasil",
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    displayName: user.displayName,
                },
            },
            201,
        );
    } catch (error) {
        console.error("Register error:", error);
        return errorResponse("Terjadi kesalahan server", 500);
    }
}
