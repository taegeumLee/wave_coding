import db from "@/lib/db";
import { NextResponse } from "next/server";

interface RouteParams {
  params: {
    id: Promise<string>;
  };
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const scheduleId = await params.id;
    const { startTime, endTime } = await request.json();

    const updatedSchedule = await db.schedule.update({
      where: {
        id: scheduleId,
      },
      data: {
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
    });

    return NextResponse.json(updatedSchedule);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update schedule" },
      { status: 500 }
    );
  }
}
