import { Lucia } from 'lucia';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { d as db } from './db_CcHuIs8X.mjs';

const adapter = new PrismaAdapter(db.session, db.user);
const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: true
    }
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      username: attributes.username,
      displayName: attributes.displayName,
      avatar: attributes.avatar,
      role: attributes.role,
      emailVerified: attributes.emailVerified,
      banned: attributes.banned
    };
  }
});

export { lucia as l };
