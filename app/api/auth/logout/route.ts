import getSession from "@/lib/session/session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
export async function POST() {
  const session = await getSession();
  session.destroy();
  (await cookies()).delete("user");

  return redirect("/login");
}
