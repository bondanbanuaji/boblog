import { l as lucia } from '../../../chunks/auth_xzWsio_p.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
async function POST(context) {
  if (!context.locals.session) {
    return new Response(null, { status: 302, headers: { Location: "/" } });
  }
  await lucia.invalidateSession(context.locals.session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return new Response(null, {
    status: 302,
    headers: { Location: "/" }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
