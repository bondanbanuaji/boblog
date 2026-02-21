import { l as lucia } from './chunks/auth_xzWsio_p.mjs';
import { d as defineMiddleware, s as sequence } from './chunks/index_Ca2YkdXW.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_BepmdUPc.mjs';
import 'piccolore';
import './chunks/astro/server_7-zI95CH.mjs';
import 'clsx';

const onRequest$1 = defineMiddleware(async (context, next) => {
  const sessionId = context.cookies.get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    context.locals.user = null;
    context.locals.session = null;
    return next();
  }
  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  }
  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  }
  context.locals.session = session;
  context.locals.user = user;
  if (context.url.pathname.startsWith("/admin")) {
    if (!user) {
      return context.redirect("/auth/login?redirect=/admin");
    }
    const adminRoles = ["SUPER_ADMIN", "ADMIN", "EDITOR"];
    if (!adminRoles.includes(user.role)) {
      return context.redirect("/?error=unauthorized");
    }
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
