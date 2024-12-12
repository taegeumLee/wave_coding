"use client";

import { Student } from "@prisma/client";
import { useEffect, useState } from "react";

export default function ConnectStudentList() {
  const [studentList, setStudentList] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudentList = async () => {
      const response = await fetch("/api/students/get_connected_students");
      const data = await response.json();
      setStudentList(data);
    };
    fetchStudentList();
  }, []);

  return (
    <div className="bg-neutral-200 w-1/4 h-3/4  rounded-lg">
      <div className="flex flex-col items-center justify-center">
        <span className="text-3xl font-bold mt-4 border-b-2 border-blue-500">
          학생 목록
        </span>
        {studentList.map((student) => (
          <div
            key={student.id}
            className="flex flex-row items-center justify-center gap-2"
          >
            <div className="relative w-3 h-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative bottom-1.5 inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <span className="text-2xl font-bold">{student.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
