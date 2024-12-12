import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const students = await db.student.findMany({
      where: {
        connected: true,
      },
    });
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}
