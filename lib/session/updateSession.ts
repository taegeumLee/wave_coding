import getSession from "@/lib/session/session";

export default async function UpdateSession(id: string) {
  const session = await getSession();
  session.id = id;
  await session.save();
}
