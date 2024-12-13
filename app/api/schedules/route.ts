import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const schedules = await db.schedule.findMany({
      include: {
        student: true,
      },
    });
    return NextResponse.json(schedules);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch schedules" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { studentId, startTime, endTime } = await request.json();

  if (!studentId || !startTime || !endTime) {
    return NextResponse.json(
      { error: "Required fields are missing" },
      { status: 400 }
    );
  }

  try {
    const newSchedule = await db.schedule.create({
      data: {
        studentId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
      include: {
        student: true,
      },
    });

    return NextResponse.json(newSchedule);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create schedule" },
      { status: 500 }
    );
  }
}
