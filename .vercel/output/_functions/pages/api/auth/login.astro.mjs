import { verify } from '@node-rs/argon2';
import { d as db } from '../../../chunks/db_CcHuIs8X.mjs';
import { l as lucia } from '../../../chunks/auth_xzWsio_p.mjs';
import { l as loginSchema } from '../../../chunks/validation_DPAxoH0U.mjs';
import { e as errorResponse, j as jsonResponse } from '../../../chunks/utils_TLTR-e7h.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
async function POST(context) {
  try {
    const body = await context.request.json();
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return errorResponse(
        Object.values(errors).flat().join(", "),
        400
      );
    }
    const { email, password } = result.data;
    const user = await db.user.findUnique({
      where: { email }
    });
    if (!user || !user.hashedPassword) {
      return errorResponse("Email atau password salah", 401);
    }
    if (user.banned) {
      return errorResponse(
        `Akun Anda telah diblokir${user.banReason ? `: ${user.banReason}` : ""}`,
        403
      );
    }
    const validPassword = await verify(user.hashedPassword, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1
    });
    if (!validPassword) {
      return errorResponse("Email atau password salah", 401);
    }
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
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login error:", error);
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
