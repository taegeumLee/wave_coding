import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
}

async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionContent>(cookieStore, {
    cookieName: "user",
    password: process.env.COOKIE_PASSWORD!,
  });
}

export default getSession;
