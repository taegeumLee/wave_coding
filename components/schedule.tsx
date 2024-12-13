"use client";

import { Schedule as ScheduleType, User } from "@prisma/client";
import { useEffect, useState } from "react";

interface StudentListProps {
  studentList: User[];
}

export default function Schedule({ studentList }: StudentListProps) {
  const [schedules, setSchedules] = useState<ScheduleType[]>([]);

  useEffect(() => {
    async function fetchSchedules() {
      if (studentList.length > 0) {
        const allSchedules: ScheduleType[] = [];
        for (const student of studentList) {
          const response = await fetch(`/api/get_user?studentId=${student.id}`);
          const data = await response.json();
          allSchedules.push(...data);
        }
        setSchedules(allSchedules);
      }
    }
    fetchSchedules();
  }, [studentList]);

  return (
    <div className="w-3/4 h-3/4 bg-neutral-200 rounded-lg">
      {schedules.map((schedule) => (
        <div key={schedule.id}>
          {new Date(schedule.startTime).toLocaleString()} ~{" "}
          {new Date(schedule.endTime).toLocaleString()}
        </div>
      ))}
    </div>
  );
}
