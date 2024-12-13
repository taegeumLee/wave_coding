import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get("studentId");

  if (!studentId) {
    return NextResponse.json(
      { error: "Student ID is required" },
      { status: 400 }
    );
  }

  const schedules = await db.schedule.findMany({
    where: {
      studentId: studentId,
    },
    include: {
      student: true, // User 정보를 포함
    },
  });

  return NextResponse.json(schedules);
}
