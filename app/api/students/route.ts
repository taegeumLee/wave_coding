import db from "@/lib/db";
import { NextResponse } from "next/server";
import getSession from "@/lib/session/session";

export async function GET() {
  try {
    const session = await getSession();
    if (!session.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const students = await db.user.findMany({
      where: {
        role: "student",
        teacherId: session.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        connected: true,
        role: true,
      },
    });

    console.log("Fetched students:", students);
    return NextResponse.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}
