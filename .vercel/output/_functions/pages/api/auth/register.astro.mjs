import { hash } from '@node-rs/argon2';
import { generateIdFromEntropySize } from 'lucia';
import { d as db } from '../../../chunks/db_CcHuIs8X.mjs';
import { l as lucia } from '../../../chunks/auth_xzWsio_p.mjs';
import { r as registerSchema } from '../../../chunks/validation_DPAxoH0U.mjs';
import { e as errorResponse, j as jsonResponse } from '../../../chunks/utils_TLTR-e7h.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
async function POST(context) {
  try {
    const body = await context.request.json();
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return errorResponse(
        Object.values(errors).flat().join(", "),
        400
      );
    }
    const { email, username, displayName, password } = result.data;
    const existingUser = await db.user.findFirst({
      where: {
        OR: [{ email }, { username }]
      }
    });
    if (existingUser) {
      if (existingUser.email === email) {
        return errorResponse("Email sudah terdaftar", 409);
      }
      return errorResponse("Username sudah digunakan", 409);
    }
    const hashedPassword = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1
    });
    const userId = generateIdFromEntropySize(10);
    const user = await db.user.create({
      data: {
        id: userId,
        email,
        username,
        displayName,
        hashedPassword,
        role: "READER"
      }
    });
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
          displayName: user.displayName
        }
      },
      201
    );
  } catch (error) {
    console.error("Register error:", error);
    return errorResponse("Terjadi kesalahan server", 500);
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
