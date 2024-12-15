import { NextResponse } from "next/server";
import db from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("user");
  if (!session) {
    return NextResponse.json(
      { error: "인증되지 않은 사용자입니다." },
      { status: 401 }
    );
  }
  try {
    const students = await db.student.findMany({
      where: {
        connected: true,
        teacherId: session.value,
      },
    });
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json(
      { error: "학생 목록을 가져오는데 실패했습니다." },
      { status: 500 }
    );
  }
}
