import db from "@/lib/db";
import getSession from "@/lib/session/session";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const studentList = await db.user.findMany({
    where: {
      connected: true,
      teacherId: session.id,
    },
  });
  return NextResponse.json(studentList);
}
