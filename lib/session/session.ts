import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { User } from "@prisma/client";

async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<User>(cookieStore, {
    cookieName: "user",
    password: process.env.COOKIE_PASSWORD!,
  });
}

export default getSession;
