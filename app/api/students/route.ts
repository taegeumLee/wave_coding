import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const students = await db.user.findMany({
      where: {
        role: "STUDENT",
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
