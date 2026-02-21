import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { db } from "./db";
import type { Role } from "@prisma/client";

const adapter = new PrismaAdapter(db.session, db.user);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: import.meta.env.PROD,
        },
    },
    getUserAttributes: (attributes) => {
        return {
            email: attributes.email,
            username: attributes.username,
            displayName: attributes.displayName,
            avatar: attributes.avatar,
            role: attributes.role,
            emailVerified: attributes.emailVerified,
            banned: attributes.banned,
        };
    },
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    email: string;
    username: string;
    displayName: string;
    avatar: string | null;
    role: Role;
    emailVerified: boolean;
    banned: boolean;
}
