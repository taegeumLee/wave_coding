import db from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("user");
  if (!session) {
    return NextResponse.json(
      { error: "인증되지 않은 사용자입니다." },
      { status: 401 }
    );
  }
  const user = await db.user.findUnique({
    where: {
      id: session.value,
    },
    select: {
      id: true,
      name: true,
    },
  });
  if (!user) {
    return NextResponse.json(
      { error: "사용자를 찾을 수 없습니다." },
      { status: 404 }
    );
  }
  return NextResponse.json(user);
}
